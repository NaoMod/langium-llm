import { PromptTemplate } from "@langchain/core/prompts";
import * as fs from 'fs';
import { traceable } from "langsmith/traceable";
import { v4 as uuidv4 } from "uuid";
import { llmFetchResponse } from "../../lib/llm-services.js";
import { m0, m1, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m2, m20, m21, m22, m23, m24, m25, m26, m27, m28, m29, m3, m30, m31, m4, m5, m6, m7, m8, m9 } from "./dataset.js";
import { normalizeModel } from "../../lib/utils.js";

const models = [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28, m29, m30, m31];
// Prompts
const prompt1 = new PromptTemplate({
  inputVariables: ["currentModel", "finalModel"],
  template: `I'm going to give you two models in Langium textual format. Tell me only a single change that we may perform on the first model to make it more similar to the second model: \n currentModel='{currentModel}' \n and \n finalModel='{finalModel}'. \n Please, give me directly the response without any explanation.`,
});

const prompt2 = new PromptTemplate({
  inputVariables: ["change", "currentModel"],
  template: `Apply the following change \n "{change}" \n to the current model \n "{currentModel}" \n and give me back the updated model directly in Langium textual syntax without any markdown formatting, backticks, or other annotations.`,
});

let currentModel: string,
  finalModel: string,
  conversationLog: any[] = [],
  round: number = 1;

  // CSV file creation for storing result data locally
const csvFile = `experimentation-results-${Date.now()}.csv`;
fs.writeFileSync(csvFile, 'Test,Duration(ms),Rounds,Convergence,Errors\n');

// Conversation function LLM 2 <=> LLM 1
async function executeLLMsCommunication() {
  // Model 1 generates the input for the LLM2
  let output1: any, output2: any;

  const tr1 = traceable(
    async () => {
      let formattedPrompt1 = await prompt1.format({
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
      output2 = await llmFetchResponse(formattedPrompt2, false);

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
  async (test: number) => {
    // Models comparison
    let convergence: boolean = normalizeModel(currentModel) === normalizeModel(finalModel);
    const MAX_LIMIT = 50;
    const startTime = Date.now();
    // Iterate as long as the models are not convergent or the rounds don't exceed a fixed number
    try {
      let modelResponse;
      while (!convergence && round < MAX_LIMIT) {
        console.log(`*** Round #${round} ***`);
        modelResponse = await executeLLMsCommunication();

        // Update the current model with the new one
        currentModel = modelResponse; 

        convergence = normalizeModel(currentModel) === normalizeModel(finalModel);
       console.log(`currentModel === finalModel`, convergence);  

        if (!convergence) {
          round++;
        } 
      }

      const duration = Date.now() - startTime;

      if (!convergence) {
        console.log(`Models NON convergent in ${round} rounds.`);
        fs.appendFileSync(csvFile, `${test + 1},${duration},${round},false,false\n`);
        console.log(`Test #${test + 1}:`, currentModel, finalModel, `Duration: ${duration}ms`, `Rounds: ${round}`, `Convergence: false`, `Errors: false`);
      } else {
        console.log(`Models convergent in ${round} rounds.`);
        fs.appendFileSync(csvFile, `${test + 1},${duration},${round},true,false\n`);
        console.log(`Test #${test + 1}:`, currentModel, finalModel, `Duration: ${duration}ms`, `Rounds: ${round}`, `Convergence: true`, `Errors: false`);
      }
    } catch (e) {
      console.error(e);
      console.log(`An error has occurred.`);
    } finally {
      console.log("Finished.");
    }
  },
  { name: `Exp1 run ID: ${uuidv4()})` }
);

// Start the tests execution
for (let i = 0; i < 16; i++) {
  console.log(`*** Starting test #${i + 1} ***`);
  currentModel = models[i * 2];
  finalModel = models[i * 2 + 1];
  
  try {
    await main(i);
  } catch (e) {
    console.log(`An error has occurred. Application terminated unexpectedly.`);
    break;
  }
}
