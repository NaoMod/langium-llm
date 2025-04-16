<div id="langium-logo" align="center">
  <a href="https://github.com/eclipse-langium/langium">
    <img alt="Langium Logo" width="60%" src="https://user-images.githubusercontent.com/4377073/135283991-90ef7724-649d-440a-8720-df13c23bda82.png">
  </a>
  <h3>
    Next-gen language engineering framework powered by an LLM extension
  </h3>
</div>

---

This is an extension of the orignal [![npm](https://https://github.com/eclipse-langium/langium)](Langium framework), aimed to facilitate interactions with LLMs during development with DSLs. Given a Langium-based DSL, we propose two approaches for the communication with the LLM: one based on the DSL concrete syntax and the other in its abstract syntax. The first one is commited on the current "main" branch, while the second one on a dedicated branch, "json_format".
Depending on the solution chosen, our extension generates a conversational interface that is aware of the grammar of the DSL concrete syntax or of the JSON Schema of its abstract syntax, enabling software engineers to collaborate with the LLM while developing in the DSL, using natural language instructions.


## Installation

Build your first language with Langium in our [online playground](https://langium.org/playground/).

Once you're ready to set up a project, you can build it locally:

```sh
sudo npm run dev-build
sudo npm run build
yo langium
```

## Examples

We host a number of examples in our [main repo](https://github.com/NaoMod/langium-llm/tree/main/examples-llm):

* **[urban-transportation](https://github.com/NaoMod/langium-llm/tree/main/examples-llm/urban-transportation)**: Urban transportation
* **[cultural-heritage](https://github.com/NaoMod/langium-llm/tree/main/examples-llm/cultural-heritage)**: Cultural heritage
* **[human-body](https://github.com/NaoMod/langium-llm/tree/main/examples-llm/human-body)**: Human body
* **[statemachine](https://github.com/NaoMod/langium-llm/tree/main/examples-llm/state-machine)**: State machine orignal extended project.
