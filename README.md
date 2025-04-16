<div id="langium-logo" align="center">
  <a href="https://github.com/eclipse-langium/langium">
    <img alt="Langium Logo" width="60%" src="https://user-images.githubusercontent.com/4377073/135283991-90ef7724-649d-440a-8720-df13c23bda82.png">
  </a>
  <h3>
    Next-gen language engineering framework powered by an LLM extension
  </h3>
</div>

---

This is an extension of the orignal [Langium framework](https://github.com/eclipse-langium/langium) project, aimed to facilitate interactions with LLMs during development with DSLs. Given a Langium-based DSL, we propose two approaches for the communication with the LLM: one based on the DSL concrete syntax and the other in its abstract syntax. The first one is commited on the "main" branch, while the second one on the current "json_format" branch.
Depending on the solution chosen, our extension generates a conversational interface that is aware of the grammar of the DSL concrete syntax or of the JSON Schema of its abstract syntax, enabling software and language engineers to collaborate with the LLM while developing in the DSL, using natural language instructions.


## Installation

Build your first language with Langium in our [online playground](https://langium.org/playground/).

Once you're ready to set up a project, you can build it locally:

```sh
sudo npm run dev-build
sudo npm run build
yo langium
```

## Examples

We host an example in our [main repo](https://github.com/NaoMod/langium-llm/tree/json_format/examples-llm):

* **[urban-transportation-json](https://github.com/NaoMod/langium-llm/tree/json_format/examples-llm/urban-transportation-json)**: Urban transportation (in JSON format)
