import dotenv from "dotenv";

import * as path from "node:path";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
    PromptTemplate,
    TypedPromptInputValues,
} from "@langchain/core/prompts";
import { LangChainTracer } from "langchain/callbacks";
import { fileURLToPath } from "node:url";
import { JsonOutputParserMarkdown } from "./utils.js";
import { langiumSyntax2JsonFormat, validateJSONModel } from "./converters.js";
import { schema as jsonSchema } from "../language/dtt.schema.json.js";

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

export async function llmPromptPreparation(userQuestion: string,
    editorMode: boolean = false, userEditorText: string = "") {
    let userInput: string, mainPrompt: PromptTemplate, formattedPrompt: string;

    if (editorMode) {
        const inputVariables: string[] = ["jsonSchemaTxt", "userQuestion"];
        let promptInputs: TypedPromptInputValues<any> = {
            jsonSchemaTxt: jsonSchema,
            userQuestion: userQuestion
        };

        mainPrompt = new PromptTemplate({
            inputVariables: inputVariables,
            template:
                "Given the following Langium grammar translated to JSON Schema: {jsonSchemaTxt} ", //\n
        });

        if (userEditorText !== "") {
            mainPrompt.template += "and this JSON model as input: {userInput},";
            userInput = langiumSyntax2JsonFormat(userEditorText);
            inputVariables.push("userInput");

            promptInputs = {
                ...promptInputs,
                userInput: userInput
            };
        }
        mainPrompt.template += `{userQuestion}? \n I expect the response as raw JSON data without any markdown formatting, backticks, or other annotations, according the JSON Schema reported, directly with a root object 'Model'. Moreover, properties must be compliant with their respective terminal types.`;

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

    return editorMode ? llmFetchResponse(formattedPrompt, jsonSchema)
        : llmFetchResponse(formattedPrompt);
}

export async function llmFetchResponse(
    formattedPrompt: string,
    jsonSchema?: object,
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

    const currentRequest = formattedPrompt;

    let retries = 1;
    const MAX_RETRIES = 5;
    const parser = new JsonOutputParserMarkdown();
    while (retries <= MAX_RETRIES) {
        // LLM invoke
        const rawResponse: any = await llm.invoke(
            formattedPrompt,
            tracer ? { callbacks: [tracer] } : {}
        );

        console.log("rawResponse.content = ", rawResponse.content);

        if (!jsonSchema) {
            return rawResponse.content;
        }

        // In this case validate the response as JSON valid object
        try {
            const outputParsed = await parser.parse(rawResponse.content as string);
            const outputParsedString = JSON.stringify(outputParsed);

            validateJSONModel(outputParsedString, jsonSchema);

            console.log("Valid JSON received:", outputParsedString);

            //Reset the retries counter
            if (retries > 0) {
                retries = 0;
            }

            return outputParsedString;
        } catch (errors) {
            console.warn(
                "Not a valid JSON received, trying again... Attempt #",
                retries
            );
            formattedPrompt = `The current response: \n ${
                rawResponse.content as string
            } \n, contains the following errors ${JSON.stringify(errors)}, so it doesn't represent a correct JSON model according toits grammar. Please fix this model and return ONLY a correct one for the current request:\n${currentRequest}`
            retries += 1;
        }

        if (retries > MAX_RETRIES) {
            throw new Error(
                "Max retries reached, impossible to get a correct model from the LLM. Try again."
            );
        }
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
