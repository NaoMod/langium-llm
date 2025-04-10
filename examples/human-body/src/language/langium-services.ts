import { NodeFileSystem } from "langium/node";
import { createHumanBodyServices } from './human-body-module.js';

// Combine generated Langium module with any necessary shared dependencies
const services =
createHumanBodyServices(
    NodeFileSystem
  ).HumanBody;

// Export the Langium services you need
export const LangiumServices = services;
export const JsonSerializer = services.serializer.JsonSerializer;
export const LangiumDocuments = services.shared.workspace.LangiumDocuments;
