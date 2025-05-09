import _ from "lodash";
import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, LangiumDocument, URI } from "langium";
import { LangiumServices } from "../../src/language/langium-services.js";
import { areAstNodesEqual } from "../../src/lib/utils.js";
import { Model } from "../../src/language/generated/ast.js";
import { createUrbanTransportationServices } from "../../src/language/urban-transportation-module.js";
import { parseHelper } from "langium/test";
import { Diagnostic } from "vscode-languageserver";

let services: ReturnType<typeof createUrbanTransportationServices>;
let parse: ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createUrbanTransportationServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.UrbanTransportation);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Validating', () => {

    test('model validation error 1', async () => {
        
        document = await parse(`
        Stop Central_Station: "Main transport hub in the city"  
        Stop Riverside: "Stop near the river park"  
        ReloaderStop University_Stop: "Stop at the university campus", power 75  
        ReloaderStop City_Hall: "Stop near the city hall", power 85  

        Bus Bus_101: stop Central_Station, battery 60  
        Bus Bus_102: stop Riverside, battery 80  
        Bus Bus_103: stop University_Stop, battery 70  
        Bus Bus_104: stop City_Hall, battery 40  

        Route Route_A: Central_Station => Riverside => University_Stop, consumption 30 
        Route Route_B: University_Stop => City_Hall => Central_Station, consumption 35  
        Route Route_A: Central_Station => Riverside => University_Stop, consumption 30
        Route Route_B: University_Stop => City_Hall => Central_Station, consumption 35
        `);

        expect(
            // here we first check for validity of the parsed document object by means of the reusable function
            //  'checkDocumentValid()' to sort out (critical) typos first,
            // and then evaluate the diagnostics by converting them into human readable strings;
            // note that 'toHaveLength()' works for arrays and strings alike ;-)
            checkDocumentValid(document)
        ).toBeDefined();
    });

    test('model validation error 2', async () => {
        
        document = await parse(`'Stop s3: "Third Stop"
        Route r2: s2 => s3
        Bus b2: stop s2`);

        expect(
            // here we first check for validity of the parsed document object by means of the reusable function
            //  'checkDocumentValid()' to sort out (critical) typos first,
            // and then evaluate the diagnostics by converting them into human readable strings;
            // note that 'toHaveLength()' works for arrays and strings alike ;-)
            checkDocumentValid(document)
        ).toBeDefined();
    });
});

async function checkDocumentValid(document: LangiumDocument): Promise<Diagnostic[] | undefined> {

    await LangiumServices.shared.workspace.DocumentBuilder.build([document], { validation: true });
    const validationErrors: Diagnostic[] = (document.diagnostics ?? []).filter(e => e.severity === 1);

    validationErrors.forEach(e => {
        console.log(diagnosticToString(e));
    });

    return (validationErrors.length > 0) ? validationErrors : undefined;
}

function diagnosticToString(d: Diagnostic) {
    return `[${d.range.start.line}:${d.range.start.character}..${d.range.end.line}:${d.range.end.character}]: ${d.message}`;
}
