import { NodeFileSystem } from "langium/node";
import { create<%= LanguageName %>Services } from './<%= language-id %>-module.js';

// Combine generated Langium module with any necessary shared dependencies
const services =
create<%= LanguageName %>Services(
    NodeFileSystem
  ).<%= LanguageName %>;

// Export the Langium services you need
export const LangiumServices = services;
export const JsonSerializer = services.serializer.JsonSerializer;
export const LangiumDocuments = services.shared.workspace.LangiumDocuments;
