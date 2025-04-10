import { NodeFileSystem } from "langium/node";
import { createCulturalHeritageServices } from './cultural-heritage-module.js';

// Combine generated Langium module with any necessary shared dependencies
const services =
createCulturalHeritageServices(
    NodeFileSystem
  ).CulturalHeritage;

// Export the Langium services you need
export const LangiumServices = services;
export const JsonSerializer = services.serializer.JsonSerializer;
export const LangiumDocuments = services.shared.workspace.LangiumDocuments;
