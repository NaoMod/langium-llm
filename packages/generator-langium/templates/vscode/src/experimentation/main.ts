import { PromptTemplate } from "@langchain/core/prompts";
import * as fs from 'fs';
import _ from "lodash";
import { traceable } from "langsmith/traceable";
import { v4 as uuidv4 } from "uuid";
import { llmFetchResponse } from "../lib/llm-services.js";
import { LangiumServices } from "../language/langium-services.js";
import { models } from "./dataset.js";
import { jsonSchema } from "../language/dtt.schema.json.js";

export const JsonSerializer = LangiumServices.serializer.JsonSerializer;

// Prompts
const prompt1 = new PromptTemplate({
  inputVariables: ["jsonSchema","currentModel", "finalModel"],
  template: `Given the following JSON Schema: \n '{jsonSchema}',\n I'm going to give you two models in JSON format. Tell me only a single change that we may perform on the first model to make it more similar to the second model: currentModel='{currentModel}' and finalModel='{finalModel}'. Please, give me directly the response without any explanation.`,
});

const prompt2 = new PromptTemplate({
  inputVariables: ["change", "currentModel"],
  template: `Apply the following change "{change}" to the current model "{currentModel}" and give me back the updated model, with a root object 'Model' as raw JSON data without any markdown formatting, backticks, or other annotations.`,
});

let conversationLog: any[] = [];

// CSV file creation for storing result data locally
const csvFile = `experimentation-results-${Date.now()}.csv`;
fs.writeFileSync(csvFile, 'Test,Duration(ms),Rounds,Convergence\n');

// Conversation function LLM 2 <=> LLM 1
async function executeLLMsCommunication(currentModel: object, finalModel: object): Promise<string> {
  // Model 1 generates the input for the LLM2
  let output1: any, output2: any;

  const tr1 = traceable(
    async () => {
      let formattedPrompt1 = await prompt1.format({
        jsonSchema: jsonSchema,
        currentModel: currentModel,
        finalModel: finalModel,
      });

      console.log("Question to LLM2:", formattedPrompt1, "\n");
      
      // LLM2 generates the change to be applied to the current model
      output1 = await llmFetchResponse(formattedPrompt1);

      console.log("Output from LLM2:", output1, "\n");

      //History Log update
      conversationLog.push({
        model: "LLM 2",
        response: output1,
      });
    },
    { name: "LLM 2 call" }
  );

  await tr1();

  const tr2 = traceable(
    async () => {
      const formattedPrompt2 = await prompt2.format({
        change: output1,
        currentModel: currentModel,
      });

      console.log("Question to LLM1:", formattedPrompt2, "\n");

      // Model 1 generates the response as the new model
      output2 = await llmFetchResponse(formattedPrompt2);

      console.log("Output LLM1:", output2, "\n");

      //History Log update
      conversationLog.push({
        model: "LLM 1",
        response: output2,
      });
    },
    { name: "LLM 1 call" }
  );

  await tr2();

  return output2 as string; // Returning the new model with the change applied
}

// Step 4: Run Conversation
const main = traceable(
  async (test: number, currentModel: object, finalModel: object) => {
    // Models comparison
    let convergence: boolean = _.isEqual(currentModel, finalModel);
    const MAX_LIMIT = 50;
    const startTime = Date.now();
    // Iterate as long as the models are not convergent or the rounds don't exceed a fixed number
    try {
      let modelResponse: string, round: number = 1;
      while (!convergence && round < MAX_LIMIT) {
        console.log(`*** Round #${round} ***`);
        modelResponse = await executeLLMsCommunication(currentModel, finalModel);

        // Update the current model with the new one
        currentModel = JSON.parse(modelResponse); 

        // If models are convergent, finished
        if (_.isEqual(currentModel, finalModel)) {
          convergence = true;
        } else {
          round++;
        }
      }

      const duration = Date.now() - startTime;
    
      if (!convergence) {
        console.log(`Models NON convergent in ${round} rounds.`);
        fs.appendFileSync(csvFile, `${test + 1},${duration},${round},false\n`);
        console.log(`Test #${test + 1}:`, currentModel, finalModel, `Duration: ${duration}ms`, `Rounds: ${round}`, `Convergence: false`);
      } else {
        console.log(`Models convergent in ${round} rounds.`);
        fs.appendFileSync(csvFile, `${test + 1},${duration},${round},true\n`);
        console.log(`Test #${test + 1}:`, currentModel, finalModel, `Duration: ${duration}ms`, `Rounds: ${round}`, `Convergence: true`);
      }
    } catch (e) {
      console.error(e);
      console.log(`An error has occurred.`);
    } finally {
      const endTime = Date.now();
      console.log("Finished.");
      console.log("Finished. Execution time:", endTime - startTime, "ms");
    }
  },
  { name: `Exp1 run ID: ${uuidv4()})` }
);

// Start the tests execution
for (let i = 0; i < models.length / 2; i++) {
  console.log(`*** Starting test #${i + 1} ***`);
  let currentModel: object = models[i * 2];
  let finalModel: object = models[i * 2 + 1];

  try {
    await main(i, currentModel, finalModel);
  } catch (e) {
    console.log(`An error has occurred. Application terminated unexpectedly.`);
    break;
  }
}
