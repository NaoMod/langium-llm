import { NodeFileSystem } from "langium/node";
import { createUrbanTransportationServices } from './urban-transportation-module.js';

// Combine generated Langium module with any necessary shared dependencies
export const LangiumServices =
createUrbanTransportationServices(
    NodeFileSystem
  ).UrbanTransportation;

export const JsonSerializer = LangiumServices.serializer.JsonSerializer;
export const LangiumDocuments = LangiumServices.shared.workspace.LangiumDocuments;
export const LangiumParser = LangiumServices.parser.LangiumParser;
