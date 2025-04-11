import { describe, expect, test } from "vitest";
import { URI } from "langium";
//import { areAstNodesEqual } from "../../src/lib/utils.js";
import { JsonSerializer, LangiumServices } from "../../src/language/langium-services.js";
import _ from "lodash";
import stableStringify from "fast-json-stable-stringify";
import { areAstNodesEqual } from "../../src/lib/utils.js";

describe('Validating', () => {
  
    /* test('check no errors', async () => {
        document = await parse(`
            person Langium
        `);

        expect(
            // here we first check for validity of the parsed document object by means of the reusable function
            //  'checkDocumentValid()' to sort out (critical) typos first,
            // and then evaluate the diagnostics by converting them into human readable strings;
            // note that 'toHaveLength()' works for arrays and strings alike ;-)
            checkDocumentValid(document) || document?.diagnostics?.map(diagnosticToString)?.join('\n')
        ).toHaveLength(0);
    }); */

    test('check convergence - success expected', async () => {
        const model1 = `Bus expressX: stop northTerminal, battery 85
        Route morningRush: northTerminal => downtownCore, consumption 12
        ReloaderStop downtownCore: "Downtown Core Charging Point", power 500
        Stop northTerminal: "North Terminal"`;

        const model2 = `Bus expressX: stop northTerminal, battery 85
        Stop northTerminal: "North Terminal"
        Route morningRush: northTerminal => downtownCore, consumption 12
        ReloaderStop downtownCore: "Downtown Core Charging Point", power 500`;

        const uri1 = URI.parse(`memory://model1.langium`);
        const uri2 = URI.parse(`memory://model2.langium`);

        const document1 = LangiumServices.shared.workspace.LangiumDocuments.createDocument(uri1, model1);
        const document2 = LangiumServices.shared.workspace.LangiumDocuments.createDocument(uri2, model2);
        await LangiumServices.shared.workspace.DocumentBuilder.build([document1, document2], { validation: true });

        const astModel1 = document1.parseResult.value;
        const astModel2 = document2.parseResult.value;

        /*const normalizedAst1 = stableStringify(JsonSerializer.serialize(astModel1));
        const normalizedAst2 = stableStringify(JsonSerializer.serialize(astModel2));*/

        expect(
            //_.isEqual(JsonSerializer.serialize(astModel1), JsonSerializer.serialize(astModel2))
            areAstNodesEqual(astModel1, astModel2)
            //normalizedAst1 === normalizedAst2
        ).toBeTruthy();
    });
});

/*
function checkDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${Model}'.`
        || undefined;
}

function diagnosticToString(d: Diagnostic) {
    return `[${d.range.start.line}:${d.range.start.character}..${d.range.end.line}:${d.range.end.character}]: ${d.message}`;
}*/
