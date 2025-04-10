import { PromptTemplate } from "@langchain/core/prompts";
import * as fs from 'fs';
import { llmFetchResponse } from "../lib/llm-services.js";
import { areAstNodesEqual } from "../lib/utils.js";
import path from "path";
import winston, { createLogger, format, transports } from "winston";
import { LangiumServices } from "../language/langium-services.js";
import { URI } from "langium";
import { models } from "./dataset.js";

// Prompts
const prompt1 = new PromptTemplate({
  inputVariables: ["currentModel", "finalModel"],
  template: `I'm going to give you two models in the Langium concrete syntax. Tell me only a single change that we may perform on the first model to make it more similar to the second model: \n currentModel='{currentModel}' \n and \n finalModel='{finalModel}'. \n Please, give me directly the response without any explanation.`,
});

const prompt2 = new PromptTemplate({
  inputVariables: ["change", "currentModel"],
  template: `Apply the following change \n "{change}" \n to the current model \n "{currentModel}" \n and give me back the updated model directly in Langium concrete syntax without any markdown formatting, backticks, or other annotations.`,
});

const nowId = Date.now();

const parentDir = path.join('.', 'logs'); // logs directory
const childDir = path.join(parentDir, `${nowId}`); // current test directory

// Create the main directory if it doesn't exist
fs.mkdirSync(childDir, { recursive: true });

// Create the CSV file for storing result data locally
const csvFilePath = path.join(childDir, `experimentation-results-${nowId}.csv`);

// Create the LOG file for tracing LLMs communication locally
const logFilePath = path.join(childDir, `experimentation-results-${nowId}.log`);

// Create the logger for the main log file
const mainLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.File({ filename: logFilePath }),
    new transports.Console()
  ]
});

// Create the logger for the CSV log file
const csvLogger = createLogger({
  level: 'info',
  format: format.combine(
    winston.format.timestamp(),
    format.printf(({ message }) => `${message}`)
  ),
  transports: [
    new transports.File({ filename: csvFilePath }),
  ]
});

csvLogger.info('Test, Duration(ms), Rounds, Convergence, Error'); // Header

// Conversation function LLM 2 <=> LLM 1
async function executeLLMsCommunication(currentModel: string, finalModel: string): Promise<string> {
  // Model 1 generates the input for the LLM2
  let output1: any, output2: any;

  const tr1 =
    async () => {
      let formattedPrompt1 = await prompt1.format({
        currentModel: currentModel,
        finalModel: finalModel,
      });

      mainLogger.info(`Question to LLM2: ${formattedPrompt1}`);

      // LLM2 generates the change to be applied to the current model
      output1 = await llmFetchResponse(formattedPrompt1, false, mainLogger);

      mainLogger.info(`Output from LLM2: ${output1}`);
    };

  await tr1();

  const tr2 =
    async () => {
      const formattedPrompt2 = await prompt2.format({
        change: output1,
        currentModel: currentModel,
      });

      mainLogger.info(`Question to LLM1: ${formattedPrompt2}`);

      // Model 1 generates the response as the new model
      output2 = await llmFetchResponse(formattedPrompt2, true, mainLogger);

      mainLogger.info(`Output from LLM1: ${output2}`);
    };

  await tr2();

  return output2 as string; // Returning the new model with the change applied
}

// Step 4: Run Conversation
const main = 
  async (testNumber: number, currentModel: string, finalModel: string) => {

    let currentModelURI = URI.parse(`memory://currentModel.${Date.now()}.test${testNumber}.langium`);
    const finalModelURI = URI.parse(`memory://finalModel.${Date.now()}.test${testNumber}.langium`);

    let currentDocument = LangiumServices.shared.workspace.LangiumDocuments.createDocument(currentModelURI, currentModel);
    const finalDocument = LangiumServices.shared.workspace.LangiumDocuments.createDocument(finalModelURI, finalModel);

    await LangiumServices.shared.workspace.DocumentBuilder.build([currentDocument, finalDocument], { validation: true });

    let currentAstModel = currentDocument.parseResult.value;
    const finalAstModel = finalDocument.parseResult.value;

    // Models comparison
    let convergence: boolean = areAstNodesEqual(currentAstModel, finalAstModel);

    const MAX_LIMIT = 50;
    const startTime = Date.now();

    // Iterate as long as the models are not convergent or the rounds don't exceed a fixed number
    try {
      let round: number = 1;
      while (!convergence && round < MAX_LIMIT) {
        mainLogger.info(`*** ROUND #${round} ***`);

        try {
          const modelResponse = await executeLLMsCommunication(currentModel, finalModel);
          // Update the current model with the new one
          currentModel = modelResponse;
          currentModelURI = URI.parse(`memory://currentModel.${Date.now()}.test${testNumber}.round${round}.langium`);
          currentDocument = LangiumServices.shared.workspace.LangiumDocuments.createDocument(currentModelURI, currentModel);
          currentAstModel = currentDocument.parseResult.value;
          await LangiumServices.shared.workspace.DocumentBuilder.build([currentDocument, finalDocument], { validation: true });

          convergence = areAstNodesEqual(currentAstModel, finalAstModel);

          mainLogger.info(`currentModel === finalModel ? ${convergence}`);

          if (!convergence) {
            round++;
          }
        }
        catch (e: any) {
          const duration = Date.now() - startTime;
          csvLogger.info(`${testNumber + 1}, ${duration}, ${round}, false, true`);
          mainLogger.error(e.message);
          return;
        }
      }

      const duration = Date.now() - startTime;

      if (!convergence) {
        mainLogger.info(`Models NON convergent in ${round} rounds.`);
        csvLogger.info(`${testNumber + 1}, ${duration}, ${round}, false, false`);
      } else {
        mainLogger.info(`Models convergent in ${round} rounds.`);
        csvLogger.info(`${testNumber + 1}, ${duration}, ${round}, true, false`);
      }
    } catch (e) {
      mainLogger.error(JSON.stringify(e));
      throw e;
    }
  };

// Start the tests execution
for (let i = 0; i < models.length / 2; i++) {

  mainLogger.info(`*** Starting test #${i + 1} ***`);

  const currentModel: string = models[i * 2];
  const finalModel: string = models[i * 2 + 1];

  try {
    await main(i, currentModel, finalModel);
  } catch (e: any) {
    mainLogger.error(`An error has occurred: ${e.message}`);
  }
}