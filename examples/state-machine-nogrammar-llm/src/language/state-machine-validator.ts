import type { ValidationChecks } from 'langium';
import type { StateMachineAstType } from './generated/ast.js';
import type { StateMachineServices } from './state-machine-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: StateMachineServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.StateMachineValidator;
    const checks: ValidationChecks<StateMachineAstType> = {
       // Example 
       // Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class StateMachineValidator {
    
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
