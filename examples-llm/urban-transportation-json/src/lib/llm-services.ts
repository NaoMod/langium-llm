import {
    PromptTemplate,
    TypedPromptInputValues,
} from "@langchain/core/prompts";
import { JsonOutputParserMarkdown } from "./utils.js";
import { langiumSyntax2JsonFormat, validateJSONModel } from "./converters.js";

import { Logger } from "winston";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { jsonSchema } from "../language/dtt.schema.json.js";

const MAX_RETRIES = 5;

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
            userInput = await langiumSyntax2JsonFormat(userEditorText);
            inputVariables.push("userInput");

            promptInputs = {
                ...promptInputs,
                userInput: userInput
            };
        }
        mainPrompt.template += `{userQuestion}? \n I expect the response as raw JSON data without any markdown formatting, backticks, or other annotations, according the JSON Schema reported, directly with a root object 'Model'. Moreover, properties must be compliant with their corresponding terminal types.`;

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

    return editorMode ? llmFetchResponse(formattedPrompt, jsonSchema)
        : llmFetchResponse(formattedPrompt);
}

export async function llmFetchResponse(
    formattedPrompt: string,
    jsonSchema?: object,
    logger?: Logger
): Promise<any> {

    const GOOGLE_API_KEY = 'AIzaSyC4QIggzilwVmN6ddbf4H2VXMrcrVSTK_8';
    const GEMINI_MODEL = 'gemini-2.0-flash';

    const llm = new ChatGoogleGenerativeAI({
        model: GEMINI_MODEL,
        maxOutputTokens: 2048,
        apiKey: GOOGLE_API_KEY,
    });

    const currentRequest = formattedPrompt;

    let retries = 1;
    const parser = new JsonOutputParserMarkdown();
    while (retries <= MAX_RETRIES) {
        // LLM invoke
        const rawResponse: any = await llm.invoke(
            formattedPrompt
        );

        if (!jsonSchema) {
            return rawResponse.content;
        }

        // In this case validate the response as JSON valid object
        try {
            const outputParsed = await parser.parse(rawResponse.content as string);
            const outputParsedString = JSON.stringify(outputParsed);

            validateJSONModel(outputParsedString, jsonSchema);
            
            if (logger) { 
                logger.info("Valid JSON received:", outputParsedString);
            } else {
                console.log("Valid JSON received:", outputParsedString);
            }

            //Reset the retries counter
            if (retries > 0) {
                retries = 0;
            }

            return outputParsedString;
        } catch (errors) {

            formattedPrompt = `The current response: \n ${
                rawResponse.content as string
            } \n, contains the following errors ${JSON.stringify(errors)}, so it doesn't represent a correct JSON model according to its grammar. Please fix this model and return ONLY a correct one for the current request:\n${currentRequest}`;

            if (logger) {
                logger.error(`${errors}`);
                logger.info(`Not a correct model received, trying again... Attempt #${retries}`);
                logger.info(`formattedPrompt updated: \n ${formattedPrompt}`);
            } else {
                console.error(
                    errors,
                    "Not a correct model received, trying again... Attempt #",
                    retries
                );
                console.info(`formattedPrompt updated: \n ${formattedPrompt}`);
            }

            retries += 1;
        }

        if (retries > MAX_RETRIES) {
            throw new Error(
                "Max retries reached, impossible to get a correct model from the LLM. Try again."
            );
        }
    }
}
