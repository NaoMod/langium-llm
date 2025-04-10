import type { ValidationChecks } from 'langium';
import type { UrbanTransportationAstType } from './generated/ast.js';
import type { UrbanTransportationServices } from './urban-transportation-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: UrbanTransportationServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.UrbanTransportationValidator;
    const checks: ValidationChecks<UrbanTransportationAstType> = {
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class UrbanTransportationValidator {
}
