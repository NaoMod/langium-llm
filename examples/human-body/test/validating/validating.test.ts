import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, URI } from "langium";
import { createHumanBodyServices } from "../../src/language/human-body-module.js";
import { areAstNodesEqual } from "../../src/lib/utils.js";
import { LangiumServices } from "../../src/language/langium-services.js";

let services: ReturnType<typeof createHumanBodyServices>;

beforeAll(async () => {
    services = createHumanBodyServices(EmptyFileSystem);
});

describe('Validating', () => {

    test('check convergence - success expected', async () => {
        const model1 = `organ Heart {
        ACTIVE,
        "Pumps blood through the body",
        connectedTo Lung,
        connectedTo Kidney,
        connectedTo Liver
    }
    organ Lung {
        ACTIVE,
        "Facilitates gas exchange",
        connectedTo Heart
    }
    organ Kidney {
        ACTIVE,
        "Filters waste from the blood",
        connectedTo Heart
    }
    organ Liver {
        ACTIVE,
        "Processes nutrients and detoxifies chemicals",
        connectedTo Heart
    }
    parameter HeartRate {
        72,
        "bpm"
    }
    parameter BloodPressure {
        120.0,
        "mmHg"
    }`;

    const model2 = `organ Heart {
        ACTIVE,
        "Pumps blood through the body",
        connectedTo Lung,
        connectedTo Kidney,
        connectedTo Liver
    }
    organ Lung {
        ACTIVE,
        "Facilitates gas exchange",
        connectedTo Heart
    }
    organ Kidney {
        ACTIVE,
        "Filters waste from the blood",
        connectedTo Heart
    }
    organ Liver {
        ACTIVE,
        "Processes nutrients and detoxifies chemicals",
        connectedTo Heart
    }
    parameter HeartRate {
        72,
        "bpm"
    }
    parameter BloodPressure {
        120.0,
        "mmHg"
    }`;

    const uri1 = URI.parse(`memory://model1.langium`);
    const uri2 = URI.parse(`memory://model2.langium`);

    const document1 = LangiumServices.shared.workspace.LangiumDocuments.createDocument(uri1, model1);
    const document2 = LangiumServices.shared.workspace.LangiumDocuments.createDocument(uri2, model2);
     await LangiumServices.shared.workspace.DocumentBuilder.build([document1, document2], { validation: true });

    const astModel1 = document1.parseResult.value;
    const astModel2 = document2.parseResult.value;

    expect(
        areAstNodesEqual(astModel1, astModel2)
    ).toBeTruthy();
    });

});
