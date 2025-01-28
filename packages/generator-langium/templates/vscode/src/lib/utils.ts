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
