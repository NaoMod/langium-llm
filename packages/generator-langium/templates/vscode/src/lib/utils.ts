import { JsonOutputParser } from "@langchain/core/output_parsers";

function cleanMarkdownJson(input: string): string {
  const output = input
    .replace(/^\s*```json\s*/i, "") // Remove the opening block (case-insensitive match for 'json')
    .replace(/```[\s\S]*$/i, "") // Remove the closing block, including all content after it
    .trim(); // Trim any extra whitespace

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
