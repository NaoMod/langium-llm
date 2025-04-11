import _ from "lodash";
import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, URI } from "langium";
import { LangiumServices } from "../../src/language/langium-services.js";
import { areAstNodesEqual } from "../../src/lib/utils.js";
import { Model } from "../../src/language/generated/ast.js";
import { createUrbanTransportationServices } from "../../src/language/urban-transportation-module.js";
import { parseHelper } from "langium/test";

let services: ReturnType<typeof createUrbanTransportationServices>;
let parse: ReturnType<typeof parseHelper<Model>>;

beforeAll(async () => {
    services = createUrbanTransportationServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.UrbanTransportation);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('ASTs comparison', () => {
    test('success', async () => {
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

        expect(
            //_.isEqual(JsonSerializer.serialize(astModel1), JsonSerializer.serialize(astModel2))
            areAstNodesEqual(astModel1, astModel2)
        ).toBeTruthy();
    });
});
