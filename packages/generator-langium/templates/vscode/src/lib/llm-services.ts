import * as fs from "fs";
import * as path from "node:path";

import { Ollama } from "@langchain/ollama";
import {
    PromptTemplate,
    TypedPromptInputValues,
} from "@langchain/core/prompts";
import { LangChainTracer } from "langchain/callbacks";
import { fileURLToPath } from "node:url";
import { LangiumServices } from "../language/langium-services.js";
import { ParseResult } from "langium";
import { OutputParserMarkdown } from "./utils.js";

const dirname = getDirname();

const LANGUAGE_ID = "<%= language-id %>";

const grammarPath = path.resolve(
    dirname,
    `../../src/language/${LANGUAGE_ID}.langium`
);
export const langiumGrammar = fs.readFileSync(grammarPath, "utf-8");

export async function llmPromptPreparation(userQuestion: string, 
    editorMode: boolean = false, userEditorText: string = "") {
    let mainPrompt: PromptTemplate, formattedPrompt: string;

    if (editorMode) {
        const inputVariables: string[] = ["langiumGrammar", "userQuestion"];
        let promptInputs: TypedPromptInputValues<any> = {
            langiumGrammar: langiumGrammar,
            userQuestion: userQuestion,
        };

        mainPrompt = new PromptTemplate({
            inputVariables: inputVariables,
            template:
                "Given the following Langium grammar: \n {langiumGrammar}, ", //\n
        });

        if (userEditorText !== "") {
            mainPrompt.template += "and this input model: \n {userInput}, \n ";
            inputVariables.push("userInput");

            promptInputs = {
                ...promptInputs,
                userInput: userEditorText,
            };
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

    const llm = new Ollama({
        model: "llama3.3:70b",
    });

    const currentRequest = formattedPrompt;

    let retries = 1;
    const MAX_RETRIES = 5;
    const parser = new OutputParserMarkdown();
    while (retries <= MAX_RETRIES) {
        // LLM invoke
        const rawResponse = await llm.invoke(
            formattedPrompt,
            tracer ? { callbacks: [tracer] } : {}
        );

        console.log("rawResponse.content = ", rawResponse);

        if (!validation) {
            return rawResponse;
        }

        try {
            const cleanedOutput = parser.parse(rawResponse as string);
            const result: ParseResult =
                LangiumServices.parser.LangiumParser.parse(cleanedOutput);

            if (result.parserErrors && result.parserErrors.length > 0) {

                const errors: Array<{name: string, message: string}> = [];
               
                result.parserErrors.forEach((error) => {
                    errors.push(
                        { name: error.name, message: error.message }
                    );
                });

                throw new Error(
                    `The current response: \n ${
                        rawResponse as string
                    } \n, contains the following errors ${JSON.stringify(errors)}, so it doesn't represent a correct Langium model according its grammar. Please fix this model and return ONLY a correct one for the current request:\n${currentRequest}`
                );
            }

            //Reset the retries counter
            if (retries > 0) {
                retries = 0;
            }

            return rawResponse;
        } catch (error: any) {
            console.warn(
                "Not a correct model received, trying again... Attempt #",
                retries
            );
            formattedPrompt = `${error.message}`;
            retries += 1;
        }
    }

    if (retries > MAX_RETRIES) {
        throw new Error(
            "Max retries reached, impossible to get a correct model from the LLM. Try again."
        );
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
