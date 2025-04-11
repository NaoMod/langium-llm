import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem } from "langium";
import { parseHelper } from "langium/test";
import { createUrbanTransportationServices } from "../../src/language/urban-transportation-module.js";
import { Model } from "../../src/language/generated/ast.js";
import { jsonSchema } from "../../src/language/dtt.schema.json.js";
import { langiumSyntax2JsonFormat, validateJSONModel } from "../../src/lib/converters.js";
import { normalizeModel } from "../../src/lib/utils.js";

let services: ReturnType<typeof createUrbanTransportationServices>;
let parse: ReturnType<typeof parseHelper<Model>>;

beforeAll(async () => {
    services = createUrbanTransportationServices(EmptyFileSystem);
    const doParse = parseHelper<Model>(services.UrbanTransportation);
    parse = (input: string) => doParse(input, { validation: true });

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Validating JSON', () => {

    test('check no errors', async () => {
        const jsonModel = { "$type": "Model", "defs": [{ "$type": "Bus", "name": "coastalShuttle", "atStop": { "$ref": "#/defs@2" }, "batteryLevel": "79" }, { "$type": "Route", "name": "oceanLine", "fromStop": { "$ref": "#/defs@2" }, "toStop": { "$ref": "#/defs@3" }, "consumption": "11" }, { "$type": "SimpleStop", "name": "seaSide", "description": "Seaside Bus Stop" }, { "$type": "SimpleStop", "name": "lighthousePoint", "description": "Lighthouse Point Terminal" }, { "$type": "Route", "name": "lighthouseLoop", "fromStop": { "$ref": "#/defs@3" }, "toStop": { "$ref": "#/defs@2" }, "consumption": "11" }, { "$type": "SimpleStop", "name": "beachFront", "description": "Beach Front Stop" }, { "$type": "ReloaderStop", "name": "beachFront2", "description": "Beach Front Charging Point", "power": "540" }] };

        expect(
            validateJSONModel(JSON.stringify(jsonModel), jsonSchema)
            ).toBeTruthy();
    });

    test('check errors', async () => {
        
        let model = `
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
        Route Route_B: University_Stop => City_Hall => Central_Station, consumption 35`;

        model = normalizeModel(model);

        const jsonModel = await langiumSyntax2JsonFormat(model);

        expect(
            validateJSONModel(jsonModel, jsonSchema)
            ).toBeFalsy();
    });
});