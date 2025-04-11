import { AstNode, LangiumDocument, URI } from "langium";
import { NodeFileSystem } from "langium/node";
import { createUrbanTransportationServices } from '../language/urban-transportation-module.js';
import { Bus, Model, ReloaderStop, Route, SimpleStop } from "../language/generated/ast.js";
import { JsonSerializer } from "../langium-services.js";
import { Ajv } from "ajv";

// retrieve the services for our language
const services = createUrbanTransportationServices(NodeFileSystem).UrbanTransportation;
const documentFactory = services.shared.workspace.LangiumDocumentFactory;

/**
 * Generates a Langium syntax string from a JSON object
 * @param json 
 */
export function jsonFormat2LangiumSyntax(json: { defs?: any[]; Model?: { defs?: any[] } }): string {

  if (json) {
    const defs = json.defs || json.Model?.defs;
    if (defs) {
      return defs.map(convertDef).join("\n");
    }
  }

  throw new Error("JSON format not valid");

  /*
    if (!json || !json.Model || !json.Model.defs) {
    throw new Error("JSON format not valid");
  }

  return json.Model.defs.map(convertDef).join("\n");
  */
}

export function convertDef(
  def: Bus | Route | SimpleStop | ReloaderStop
): string {
  if (!def) {
    throw new Error(`def object is undefined`);
  }

  switch (def.$type) {
    case "Bus":
      return convertBus(def as Bus);
    case "Route":
      return convertRoute(def as Route);
    case "SimpleStop":
      return convertSimpleStop(def as SimpleStop);
    case "ReloaderStop":
      return convertReloaderStop(def as ReloaderStop);
  }
}

function convertBus(bus: Bus): string {
  return `Bus ${bus.name}: stop ${bus.atStop.ref?.name}${bus.batteryLevel ? `, battery ${bus.batteryLevel}` : ""
    }`;
}

function convertRoute(route: Route): string {
  return `Route ${route.name}: ${route.fromStop.ref?.name} => ${route.toStop.ref?.name}${route.consumption ? `, consumption ${route.consumption}` : ""
    }`;
}

function convertSimpleStop(stop: SimpleStop): string {
  return `Stop ${stop.name}: "${stop.description}"`;
}

function convertReloaderStop(stop: ReloaderStop): string {
  return `ReloaderStop ${stop.name}: "${stop.description}"${stop.power ? `, power ${stop.power}` : ""
    }`;
}

/**
 * Generates a JSON string from Langium model instance
 * @param langiumText
 * @returns JSON string
 */
export async function langiumSyntax2JsonFormat(
  langiumText: string
): Promise<string | never> {
  // Step 1: Parse the Langium model into structured data
  const parsedModel: Model | undefined = await langiumStringToAST(
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
export async function langiumStringToAST(
  langiumString: string
): Promise<AstNode | undefined> {
  // Create a new document URI (required by Langium’s document services)
  const uri = URI.parse(`memory://model.langium.${Date.now()}.${Math.random()}`);

  // Parse the document into an AST
  const document: LangiumDocument<AstNode> = documentFactory.fromString(
    langiumString,
    uri
  );

  // Costruisci il documento per calcolare gli scope e risolvere i riferimenti
  await services.shared.workspace.DocumentBuilder.build([document], { validation: true });

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
  }

  return isValid || false;
}