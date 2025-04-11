import type { ValidationChecks } from 'langium';
import type { HumanBodyAstType } from './generated/ast.js';
import type { HumanBodyServices } from './human-body-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HumanBodyServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HumanBodyValidator;
    const checks: ValidationChecks<HumanBodyAstType> = {
       // Example 
       // Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HumanBodyValidator {
    
    /*
    // Example of a custom validation check
    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    } */

}
