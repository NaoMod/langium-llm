/******************************************************************************
 * This file was generated by langium-cli 3.3.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import type { AstNode, Reference, ReferenceInfo, TypeMetaData } from 'langium';
import { AbstractAstReflection } from 'langium';

export const ArithmeticsTerminals = {
    WS: /\s+/,
    ID: /[_a-zA-Z][\w_]*/,
    NUMBER: /[0-9]+(\.[0-9]*)?/,
    ML_COMMENT: /\/\*[\s\S]*?\*\//,
    SL_COMMENT: /\/\/[^\n\r]*/,
};

export type ArithmeticsTerminalNames = keyof typeof ArithmeticsTerminals;

export type ArithmeticsKeywordNames = 
    | "%"
    | "("
    | ")"
    | "*"
    | "+"
    | ","
    | "-"
    | "/"
    | ":"
    | ";"
    | "^"
    | "def"
    | "module";

export type ArithmeticsTokenNames = ArithmeticsTerminalNames | ArithmeticsKeywordNames;

export type AbstractDefinition = DeclaredParameter | Definition;

export const AbstractDefinition = 'AbstractDefinition';

export function isAbstractDefinition(item: unknown): item is AbstractDefinition {
    return reflection.isInstance(item, AbstractDefinition);
}

export type Expression = BinaryExpression | FunctionCall | NumberLiteral;

export const Expression = 'Expression';

export function isExpression(item: unknown): item is Expression {
    return reflection.isInstance(item, Expression);
}

export type Statement = Definition | Evaluation;

export const Statement = 'Statement';

export function isStatement(item: unknown): item is Statement {
    return reflection.isInstance(item, Statement);
}

export interface BinaryExpression extends AstNode {
    readonly $container: BinaryExpression | Definition | Evaluation | FunctionCall;
    readonly $type: 'BinaryExpression';
    left: Expression;
    operator: '%' | '*' | '+' | '-' | '/' | '^';
    right: Expression;
}

export const BinaryExpression = 'BinaryExpression';

export function isBinaryExpression(item: unknown): item is BinaryExpression {
    return reflection.isInstance(item, BinaryExpression);
}

export interface DeclaredParameter extends AstNode {
    readonly $container: Definition;
    readonly $type: 'DeclaredParameter';
    name: string;
}

export const DeclaredParameter = 'DeclaredParameter';

export function isDeclaredParameter(item: unknown): item is DeclaredParameter {
    return reflection.isInstance(item, DeclaredParameter);
}

export interface Definition extends AstNode {
    readonly $container: Module;
    readonly $type: 'Definition';
    args: Array<DeclaredParameter>;
    expr: Expression;
    name: string;
}

export const Definition = 'Definition';

export function isDefinition(item: unknown): item is Definition {
    return reflection.isInstance(item, Definition);
}

export interface Evaluation extends AstNode {
    readonly $container: Module;
    readonly $type: 'Evaluation';
    expression: Expression;
}

export const Evaluation = 'Evaluation';

export function isEvaluation(item: unknown): item is Evaluation {
    return reflection.isInstance(item, Evaluation);
}

export interface FunctionCall extends AstNode {
    readonly $container: BinaryExpression | Definition | Evaluation | FunctionCall;
    readonly $type: 'FunctionCall';
    args: Array<Expression>;
    func: Reference<AbstractDefinition>;
}

export const FunctionCall = 'FunctionCall';

export function isFunctionCall(item: unknown): item is FunctionCall {
    return reflection.isInstance(item, FunctionCall);
}

export interface Module extends AstNode {
    readonly $type: 'Module';
    name: string;
    statements: Array<Statement>;
}

export const Module = 'Module';

export function isModule(item: unknown): item is Module {
    return reflection.isInstance(item, Module);
}

export interface NumberLiteral extends AstNode {
    readonly $container: BinaryExpression | Definition | Evaluation | FunctionCall;
    readonly $type: 'NumberLiteral';
    value: number;
}

export const NumberLiteral = 'NumberLiteral';

export function isNumberLiteral(item: unknown): item is NumberLiteral {
    return reflection.isInstance(item, NumberLiteral);
}

export type ArithmeticsAstType = {
    AbstractDefinition: AbstractDefinition
    BinaryExpression: BinaryExpression
    DeclaredParameter: DeclaredParameter
    Definition: Definition
    Evaluation: Evaluation
    Expression: Expression
    FunctionCall: FunctionCall
    Module: Module
    NumberLiteral: NumberLiteral
    Statement: Statement
}

export class ArithmeticsAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return [AbstractDefinition, BinaryExpression, DeclaredParameter, Definition, Evaluation, Expression, FunctionCall, Module, NumberLiteral, Statement];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            case BinaryExpression:
            case FunctionCall:
            case NumberLiteral: {
                return this.isSubtype(Expression, supertype);
            }
            case DeclaredParameter: {
                return this.isSubtype(AbstractDefinition, supertype);
            }
            case Definition: {
                return this.isSubtype(AbstractDefinition, supertype) || this.isSubtype(Statement, supertype);
            }
            case Evaluation: {
                return this.isSubtype(Statement, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'FunctionCall:func': {
                return AbstractDefinition;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case BinaryExpression: {
                return {
                    name: BinaryExpression,
                    properties: [
                        { name: 'left' },
                        { name: 'operator' },
                        { name: 'right' }
                    ]
                };
            }
            case DeclaredParameter: {
                return {
                    name: DeclaredParameter,
                    properties: [
                        { name: 'name' }
                    ]
                };
            }
            case Definition: {
                return {
                    name: Definition,
                    properties: [
                        { name: 'args', defaultValue: [] },
                        { name: 'expr' },
                        { name: 'name' }
                    ]
                };
            }
            case Evaluation: {
                return {
                    name: Evaluation,
                    properties: [
                        { name: 'expression' }
                    ]
                };
            }
            case FunctionCall: {
                return {
                    name: FunctionCall,
                    properties: [
                        { name: 'args', defaultValue: [] },
                        { name: 'func' }
                    ]
                };
            }
            case Module: {
                return {
                    name: Module,
                    properties: [
                        { name: 'name' },
                        { name: 'statements', defaultValue: [] }
                    ]
                };
            }
            case NumberLiteral: {
                return {
                    name: NumberLiteral,
                    properties: [
                        { name: 'value' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    properties: []
                };
            }
        }
    }
}

export const reflection = new ArithmeticsAstReflection();
