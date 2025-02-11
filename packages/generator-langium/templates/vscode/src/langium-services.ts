import { create<%= LanguageName %>Services } from './language/<%= language-id %>-module.js';
import { NodeFileSystem } from "langium/node";

// Combine generated Langium module with any necessary shared dependencies
const services = create<%= LanguageName %>Services(NodeFileSystem).<%= LanguageName %>;

// Export the Langium services you need
export const LangiumServices = services;
export const JsonSerializer = services.serializer.JsonSerializer;
export const LangiumDocuments = services.shared.workspace.LangiumDocuments;
