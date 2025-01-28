import dotenv from "dotenv";

import * as vscode from 'vscode';
import * as fs from "fs";
import * as path from "node:path";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate, TypedPromptInputValues } from "@langchain/core/prompts";
import { LangChainTracer } from "langchain/callbacks";
import { fileURLToPath } from "node:url";
import { LangiumServices } from "../language/langium-services.js";
import { ParseResult } from "langium";
import { OutputParserMarkdown } from "./utils.js";

const dirname = getDirname();
const fullPath = path.resolve(dirname, "../../config.env");

console.log("fullPath:", fullPath);

const envConfigResult = dotenv.config({
  path: fullPath,
});

if (envConfigResult.error) {
  console.error("Error loading .env file:", envConfigResult.error);
} else {
  console.log("configPath:", envConfigResult);
}

const LANGUAGE_ID = '<%= language-id %>';

const grammarPath = path.resolve(
    __dirname,
    `../../src/language/${LANGUAGE_ID}.langium`
  );
const langiumGrammar = fs.readFileSync(grammarPath, "utf-8");

export async function llmPromptPreparation(userQuestion: string) {
    let userInput: string, mainPrompt: PromptTemplate, formattedPrompt: string;

    const editor = vscode.window.activeTextEditor;
    const editorMode: boolean =
        editor !== undefined && editor.document.languageId === LANGUAGE_ID;

    if (editorMode) {
        const inputVariables: string[] = ["langiumGrammar", "userQuestion"];
        let promptInputs: TypedPromptInputValues<any> = {
            langiumGrammar: langiumGrammar,
            userQuestion: userQuestion
        }

        mainPrompt = new PromptTemplate({
            inputVariables: inputVariables,
            template:
                "Given the following Langium grammar: \n {langiumGrammar}, ", //\n
        });

        if (editor && editor.document.getText() !== "") {
            mainPrompt.template +=
                "and this input model: \n {userInput}, \n ";
            userInput = editor.document.getText();
            inputVariables.push("userInput");

            promptInputs = {
                ...promptInputs,
                userInput: userInput
            }
        }
        mainPrompt.template += `{userQuestion}? \n I expect the response directly in the corresponding VALID Langium textual syntax according to the grammar provided, without any markdown and/or backticks, neither Model object root element. Also terminal types must be valid.`;

        formattedPrompt = await mainPrompt.format(promptInputs);
    } else {
        mainPrompt = new PromptTemplate({
            inputVariables: ["userQuestion"],
            template: "{userQuestion}",
        });

        formattedPrompt = await mainPrompt.format({
            userQuestion: userQuestion,
        });
    }

    console.log("formattedPrompt = ", `${formattedPrompt}`);

    return llmFetchResponse(formattedPrompt, editorMode);
}

export async function llmFetchResponse(
  formattedPrompt: string,
  validation: boolean = false,
  tracer?: LangChainTracer
): Promise<any> {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const GEMINI_MODEL = process.env.GEMINI_MODEL;

  // Set up the Google Gemini LLM (using OpenAI as an example interface)
  const llm = new ChatGoogleGenerativeAI({
    model: GEMINI_MODEL,
    maxOutputTokens: 2048,
    apiKey: GOOGLE_API_KEY,
  });

  let retries = 1;
  const MAX_RETRIES = 3;
  const parser = new OutputParserMarkdown();
  while (retries <= MAX_RETRIES) {
    // LLM invoke
    const rawResponse = await llm.invoke(
      formattedPrompt,
      tracer ? { callbacks: [tracer] } : {}
    );

    console.log("rawResponse.content = ", rawResponse.content);

    if(!validation) {
      return rawResponse.content;
    }

    try {
      const cleanedOutput = parser.parse(rawResponse.content as string);
      const result: ParseResult = LangiumServices.parser.LangiumParser.parse(
        cleanedOutput
      );

      if (result.parserErrors && result.parserErrors.length > 0) {
        throw new Error(
          `The current response: \n ${
            rawResponse.content as string
          } \n, contains the following errors ${
            result.parserErrors
          }, so it doesn't represent a correct Langium model according its grammar. Please fix this model and return ONLY a correct one for the current request:\n`
        );
      }

      //Reset the retries counter
      if (retries > 0) {
        retries = 0;
      }

      return rawResponse.content;
    } catch (error) {
      console.warn(
        "Not a correct model received, trying again... Attempt #",
        retries
      );
      formattedPrompt = `${error}`;
      retries += 1;
    }
  }

  if(retries > MAX_RETRIES) {
    throw new Error('Max retries reached, impossible to get a correct model from the LLM. Try again.');
  }
}

function getDirname(): string {
  if (typeof __dirname !== "undefined") {
    // CommonJS
    return __dirname;
  } else if (typeof import.meta !== "undefined" && import.meta.url) {
    // ES Modules
    return path.dirname(fileURLToPath(import.meta.url));
  } else {
    throw new Error(
      "Unable to determine __dirname in the current environment."
    );
  }
}
