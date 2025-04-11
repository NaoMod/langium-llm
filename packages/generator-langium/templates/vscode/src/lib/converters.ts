import { Ajv } from "ajv";
import { AstNode, LangiumDocument, URI } from "langium";
import { NodeFileSystem } from "langium/node";
import { create<%= LanguageName %>Services } from '../language/<%= language-id %>-module.js';
import { Model } from "../language/generated/ast.js";
import { JsonSerializer } from "../langium-services.js";

// retrieve the services for our language
const services = create<%= LanguageName %>Services(NodeFileSystem).<%= LanguageName %>;

const documentFactory = services.shared.workspace.LangiumDocumentFactory;

// provide a conversion function from JSON to Langium syntax
/**
 * Generates a Langium syntax string from a JSON object
 * @param json 
 */
export function jsonFormat2LangiumSyntax(json: any): string {
  throw new Error("Not implemented yet");
}

/**
 * Generates a JSON string from Langium model instance
 * @param langiumText
 * @returns JSON string
 */
export function langiumSyntax2JsonFormat(
  langiumText: string
): string | never {
  // Step 1: Parse the Langium model into structured data
  const parsedModel: Model | undefined = langiumStringToAST(
    langiumText
  ) as Model;

  if (!parsedModel) {
    throw new Error("Langium string is unparsable. Check the input.");
  }

  const parsedModelString: string = JsonSerializer.serialize(parsedModel);
  console.log("parsedModelString (via JsonSerializer) => ", parsedModelString);

  return parsedModelString;
}

/**
 * Parses and transforms a Langium string into a AST Model
 * @param langiumString The Langium string model
 * @returns Model or undefined if the Langium string model is unparsable
 */
export function langiumStringToAST(
  langiumString: string
): AstNode | undefined {
  // Create a new document URI (required by Langium’s document services)
  const uri = URI.parse("memory://model.langium");

  // Parse the document into an AST
  const document: LangiumDocument<AstNode> = documentFactory.fromString(
    langiumString,
    uri
  );

  // For checking possibly for parse errors
  /*if (document.parseResult.lexerErrors.length > 0) {
    console.error("Errors during parsing:", document.diagnostics);
    return undefined;
  }*/

  return document.parseResult.value;
}

/**
 * Validate a JSON model against a JSONSchema.
 * @param schema
 * @param model
 * @returns
 */
export function validateJSONModel(model: string, schema: object) {

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(JSON.parse(model));

  if (!isValid) {
    console.error("Validation errors:", validate.errors);
    throw new Error(JSON.stringify(validate.errors));
  }

  return isValid;
}
