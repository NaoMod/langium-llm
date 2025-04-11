import { JsonOutputParser } from "@langchain/core/output_parsers";
import { AstNode, isReference } from "langium";

function cleanMarkdownJson(input: string): string {
  const output = input
    .replace(/^\s*```json\s*/i, "")   // Remove the opening of the block
    .replace(/```\s*$/i, "")         // Remove the closing of the block
    .trim();                         // Remove leading and trailing whitespaces

  return output;
}

export class JsonOutputParserMarkdown extends JsonOutputParser {
  override parse(output: string): any {
    // Clean the JSON from Markdown
    const cleanedOutput = cleanMarkdownJson(output);

    // Call the parent class to parse the cleaned JSON
    return super.parse(cleanedOutput);
  }
}


function normalizeWhitespace(str: string): string {
  return str.replace(/\\n\s*|\\n|\\t|\s{2,}/g, '')
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

export function areAstNodesEqual(node1: AstNode | undefined,
  node2: AstNode | undefined): boolean {
  if (node1 === node2) return true;
  if (!node1 || !node2) return false;
  if (node1.$type !== node2.$type) return false;

  const node1String = deterministicStringify(node1);
  const node2String = deterministicStringify(node2);

  return node1String === node2String;
}

export function normalizeModel(jsonString: string): any {
  // Remove unnecessary whitespace and newlines
  const cleanedString = jsonString.replace(/\\n\s*|\\n|\\t|\s{2,}/g, '');

  //  return JSON.parse(cleanedString);
  return cleanedString;
}