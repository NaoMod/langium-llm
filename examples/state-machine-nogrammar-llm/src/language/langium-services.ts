import { NodeFileSystem } from "langium/node";
import { createStateMachineServices } from './state-machine-module.js';

// Combine generated Langium module with any necessary shared dependencies
const services =
createStateMachineServices(
    NodeFileSystem
  ).StateMachine;

// Export the Langium services you need
export const LangiumServices = services;
export const JsonSerializer = services.serializer.JsonSerializer;
export const LangiumDocuments = services.shared.workspace.LangiumDocuments;
