import _ from "lodash";
import { LangiumServices } from "../language/langium-services.js";
import { AstNode, isReference } from "langium";
/*import { createHash } from "crypto";
import { EmptyFileSystem } from "langium";
import { createUrbanTransportationServices } from "../language/urban-transportation-module.js";
import { parseHelper } from "langium/test";
import { Model } from "../language/generated/ast.js";*/

//const services = createUrbanTransportationServices(EmptyFileSystem);
//const parse = parseHelper<Model>(services.UrbanTransportation);

function cleanMarkdown(input: string): string {
  return input.replace(/^```(langium|json)?\n|\n```$/g, '');
}

export class OutputParserMarkdown {
  parse(output: string): any {
    // Clean the JSON from Markdown
    const cleanedOutput = cleanMarkdown(output);

    // Call the parent class to parse the cleaned JSON
    return cleanedOutput;
  }
}

/**
 * Compares two ASTs to check if they are semantically identical.
 * @param node1 
 * @param node2 
 * @returns true if the AST node are equal, false otherwise.
 */
/*export async function areAstNodesEqual(currentModel: string, finalModel: string): Promise<boolean> {
  return _.isEqual(JsonSerializer.serialize((await parse(currentModel)).parseResult.value),
  JsonSerializer.serialize((await parse(finalModel)).parseResult.value));
}*/

/**
 * Normalizes a Langium model by removing leading and trailing whitespaces and trimming each line.
 * @param model 
 * @returns 
 */
export function normalizeModel(model: string): string {
  return model
    .trim() // Rimuove spazi bianchi iniziali e finali
    .split('\n') // Divide in linee
    .map(line => line.trim()) // Rimuove spazi bianchi da ogni linea
    .join('\n'); // Ricompone il modello normalizzato
}

/**
 * Parses a Langium model and returns the corresponding AST.
 * @param model 
 * @returns AST node
 */
export function parseModel(model: string): AstNode {
  return LangiumServices.parser.LangiumParser.parse(model).value;
}

function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

function deterministicStringify(obj: any, seen: Set<any> = new Set()): string {
  if (typeof obj === 'string') {
    return JSON.stringify(normalizeWhitespace(obj)); // Normalize whitespace
  }
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return String(obj);
  }

  if (Array.isArray(obj)) {
    const serializedElements = obj.map(element => deterministicStringify(element, seen));
    serializedElements.sort();
    return '[' + serializedElements.join(',') + ']';
  }

  if (isReference(obj)) {
    return deterministicStringify(obj.ref, seen); // Serialize the referenced object
  }

  if (typeof obj === 'object' && obj !== null) {
    if (seen.has(obj)) {
      return '"[Circular]"'; // Handle circular references
    }
    seen.add(obj);

    const keys = Object.keys(obj).sort();
    const parts = keys.map(key => {
      if (key.startsWith('$')) return ''; // Ignore Langium-specific properties
      return JSON.stringify(key) + ':' + deterministicStringify(obj[key], seen);
    });
    seen.delete(obj); // Clean up after processing
    return '{' + parts.filter(p => p !== '').join(',') + '}';
  }

  return String(obj);
}

export function areAstNodesEqual(node1: AstNode | undefined, node2: AstNode | undefined): boolean {
  if (node1 === node2) return true;
  if (!node1 || !node2) return false;
  if (node1.$type !== node2.$type) return false;

  // Not needed
  /*const hash1 = createHash('sha256').update(deterministicStringify(node1)).digest('hex');
  const hash2 = createHash('sha256').update(deterministicStringify(node2)).digest('hex');*/

  const hash1 = deterministicStringify(node1);
  const hash2 = deterministicStringify(node2);

  return hash1 === hash2;
}
