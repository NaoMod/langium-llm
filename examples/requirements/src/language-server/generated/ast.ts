/******************************************************************************
 * This file was generated by langium-cli 2.0.1.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import type { AstNode, Reference, ReferenceInfo, TypeMetaData } from 'langium';
import { AbstractAstReflection } from 'langium';

export const RequirementsAndTestsTerminals = {
    WS: /\s+/,
    ID: /[_a-zA-Z][\w_]*/,
    STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/,
    ML_COMMENT: /\/\*[\s\S]*?\*\//,
    SL_COMMENT: /\/\/[^\n\r]*/,
};

export interface Contact extends AstNode {
    readonly $container: RequirementModel | TestModel;
    readonly $type: 'Contact';
    user_name: string
}

export const Contact = 'Contact';

export function isContact(item: unknown): item is Contact {
    return reflection.isInstance(item, Contact);
}

export interface Environment extends AstNode {
    readonly $container: RequirementModel;
    readonly $type: 'Environment';
    description: string
    name: string
}

export const Environment = 'Environment';

export function isEnvironment(item: unknown): item is Environment {
    return reflection.isInstance(item, Environment);
}

export interface Requirement extends AstNode {
    readonly $container: RequirementModel;
    readonly $type: 'Requirement';
    environments: Array<Reference<Environment>>
    name: string
    text: string
}

export const Requirement = 'Requirement';

export function isRequirement(item: unknown): item is Requirement {
    return reflection.isInstance(item, Requirement);
}

export interface RequirementModel extends AstNode {
    readonly $type: 'RequirementModel';
    contact?: Contact
    environments: Array<Environment>
    requirements: Array<Requirement>
}

export const RequirementModel = 'RequirementModel';

export function isRequirementModel(item: unknown): item is RequirementModel {
    return reflection.isInstance(item, RequirementModel);
}

export interface Test extends AstNode {
    readonly $container: TestModel;
    readonly $type: 'Test';
    environments: Array<Reference<Environment>>
    name: string
    requirements: Array<Reference<Requirement>>
    testFile?: string
}

export const Test = 'Test';

export function isTest(item: unknown): item is Test {
    return reflection.isInstance(item, Test);
}

export interface TestModel extends AstNode {
    readonly $type: 'TestModel';
    contact?: Contact
    tests: Array<Test>
}

export const TestModel = 'TestModel';

export function isTestModel(item: unknown): item is TestModel {
    return reflection.isInstance(item, TestModel);
}

export type RequirementsAndTestsAstType = {
    Contact: Contact
    Environment: Environment
    Requirement: Requirement
    RequirementModel: RequirementModel
    Test: Test
    TestModel: TestModel
}

export class RequirementsAndTestsAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return ['Contact', 'Environment', 'Requirement', 'RequirementModel', 'Test', 'TestModel'];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'Requirement:environments':
            case 'Test:environments': {
                return Environment;
            }
            case 'Test:requirements': {
                return Requirement;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'Requirement': {
                return {
                    name: 'Requirement',
                    mandatory: [
                        { name: 'environments', type: 'array' }
                    ]
                };
            }
            case 'RequirementModel': {
                return {
                    name: 'RequirementModel',
                    mandatory: [
                        { name: 'environments', type: 'array' },
                        { name: 'requirements', type: 'array' }
                    ]
                };
            }
            case 'Test': {
                return {
                    name: 'Test',
                    mandatory: [
                        { name: 'environments', type: 'array' },
                        { name: 'requirements', type: 'array' }
                    ]
                };
            }
            case 'TestModel': {
                return {
                    name: 'TestModel',
                    mandatory: [
                        { name: 'tests', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new RequirementsAndTestsAstReflection();
