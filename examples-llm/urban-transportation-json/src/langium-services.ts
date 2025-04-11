import { createUrbanTransportationServices } from './language/urban-transportation-module.js';
import { NodeFileSystem } from "langium/node";

// Combine generated Langium module with any necessary shared dependencies
const services = createUrbanTransportationServices(NodeFileSystem).UrbanTransportation;

// Export the Langium services you need
export const LangiumServices = services;
export const JsonSerializer = services.serializer.JsonSerializer;
export const LangiumDocuments = services.shared.workspace.LangiumDocuments;
