import { AstNode, isReference } from "langium";
import { LangiumServices } from "../language/langium-services.js";

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

  const node1Str = deterministicStringify(node1);
  const node2Str = deterministicStringify(node2);

  return node1Str === node2Str;
}
