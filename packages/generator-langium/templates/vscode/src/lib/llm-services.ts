import * as fs from "fs";
import * as path from "node:path";

import { Ollama } from "@langchain/ollama";
import {
    PromptTemplate,
    TypedPromptInputValues,
} from "@langchain/core/prompts";
import { Logger } from "winston";
import { fileURLToPath } from "node:url";
import { LangiumServices } from "../language/langium-services.js";
import { Diagnostic } from "vscode-languageserver";
import { parseHelper } from "langium/test";
import { Model } from "../language/generated/ast.js";

const parse = parseHelper<Model>(LangiumServices);

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
        mainPrompt.template += `{userQuestion}? \n I expect the response directly in the corresponding VALID Langium textual syntax according to the grammar provided, without any markdown and/or backticks. Also terminal types must be valid.`;

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
    logger?: Logger
): Promise<any> {

    const llm = new Ollama({
        model: "llama3.3:70b",
    });

    const currentRequest = formattedPrompt;

    let retries = 1;
    const MAX_RETRIES = 5;
    
    while (retries <= MAX_RETRIES) {
        // LLM invoke
        const rawResponse = await llm.invoke(
            formattedPrompt
        );

        if (!validation) {
            return rawResponse;
        }

        try {
            const document = await parse(rawResponse as string);

            await LangiumServices.shared.workspace.DocumentBuilder.build([document], { validation: true });

            const validationErrors: Diagnostic[] = (document.diagnostics ?? []).filter(e => e.severity === 1);
            if (validationErrors.length > 0) { 
                throw new Error(
                    `The current response: \n ${rawResponse as string} 
                    \n, contains the following errors: \n '${JSON.stringify(validationErrors)}' \n, so it doesn't represent a correct Langium model according to its grammar. Please fix this model and return ONLY a correct one for the current request:\n${currentRequest}`
                );
            }

            //Reset the retries counter
            if (retries > 0) {
                retries = 0;
            }

            return rawResponse;
        } catch (error: any) {
            formattedPrompt = `${error.message}`;

            if (logger) {
                logger.error(`${error}`);
                logger.info(`Not a correct model received, trying again... Attempt #${retries}`);
                logger.info(`formattedPrompt updated: \n ${formattedPrompt}`);
            } else {
                console.error(
                    error,
                    "Not a correct model received, trying again... Attempt #",
                    retries
                );
                console.info(`formattedPrompt updated: \n ${formattedPrompt}`);
            }

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
