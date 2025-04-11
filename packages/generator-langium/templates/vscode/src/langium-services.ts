import { create<%= LanguageName %>Services } from './language/<%= language-id %>-module.js';
import { NodeFileSystem } from "langium/node";

// Combine generated Langium module with any necessary shared dependencies and export it
export const LangiumServices = create<%= LanguageName %>Services(NodeFileSystem).<%= LanguageName %>;
export const JsonSerializer = LangiumServices.serializer.JsonSerializer;
export const LangiumDocuments = LangiumServices.shared.workspace.LangiumDocuments;
