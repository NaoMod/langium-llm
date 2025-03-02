import { PromptTemplate } from "@langchain/core/prompts";
import _ from "lodash";
import { traceable } from "langsmith/traceable";
import { v4 as uuidv4 } from "uuid";
import { mFinal } from "./mFinal.js";
import { m0 } from "./m0.js";
import { EmptyFileSystem } from "langium";
import { Model } from "../../language/generated/ast.js";
import { parseHelper } from "langium/test";
import { llmFetchResponse } from "../../lib/llm-services.js";
import { LangiumServices } from "../../language/langium-services.js";
import { create<%= LanguageName %>Services } from "../../language/<%= language-id %>-module.js";

export const JsonSerializer = LangiumServices.serializer.JsonSerializer;
const services = create<%= LanguageName %>Services(EmptyFileSystem);
const parse = parseHelper<Model>(services.<%= LanguageName %>);

// Prompts
const prompt1 = new PromptTemplate({
  inputVariables: ["currentModel", "finalModel"],
  template: `I'm going to give you two models in Langium textual format. Tell me only a single change that we may perform on the first model to make it more similar to the second model: \n currentModel='{currentModel}' \n and \n finalModel='{finalModel}'. \n Please, give me directly the response without any explanation.`,
});

const prompt2 = new PromptTemplate({
  inputVariables: ["change", "currentModel"],
  template: `Apply the following change \n "{change}" \n to the current model \n "{currentModel}" \n and give me back the updated model directly in Langium textual syntax without any markdown formatting, backticks, or other annotations.`,
});

let currentModel = m0,
  finalModel = mFinal,
  conversationLog: any[] = [],
  round: number = 1;

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
  async () => {
    // Models comparison
    let convergence: boolean = _.isEqual(currentModel, finalModel);
    const MAX_LIMIT = 50;
    const startTime = Date.now();
    // Iterate as long as the models are not convergent or the rounds don't exceed a fixed number
    try {
      let modelResponse;
      while (!convergence && round < MAX_LIMIT) {
        console.log(`*** Round #${round} ***`);
        modelResponse = await executeLLMsCommunication();

        // Update the current model with the new one
        currentModel = JSON.parse(modelResponse); 

        // If models are convergent, finished
        if (_.isEqual(currentModel, finalModel)) {
          convergence = true;
        } else {
          round++;
        }
      }
      if (!convergence) {
        console.log(`Models NON convergent in ${round} rounds.`);
      } else {
        console.log(`Models convergent in ${round} rounds.`);
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

await main();
