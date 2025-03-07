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
