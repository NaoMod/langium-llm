import type { ValidationChecks } from 'langium';
import type { <%= LanguageName %>AstType } from './generated/ast.js';
import type { <%= LanguageName %>Services } from './<%= language-id %>-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: <%= LanguageName %>Services) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.<%= LanguageName %>Validator;
    const checks: ValidationChecks<<%= LanguageName %>AstType> = {
       // Example 
       // Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class <%= LanguageName %>Validator {
    
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
