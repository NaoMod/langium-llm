import type { ValidationChecks } from 'langium';
import type { CulturalHeritageAstType } from './generated/ast.js';
import type { CulturalHeritageServices } from './cultural-heritage-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: CulturalHeritageServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.CulturalHeritageValidator;
    const checks: ValidationChecks<CulturalHeritageAstType> = {
       // Example 
       // Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class CulturalHeritageValidator {
    
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
