import type { ValidationAcceptor, ValidationRegistry } from 'langium';
import type { UrbanTransportationServices } from './urban-transportation-module.js';
import { Bus, Route, isBus, isRoute } from '../language/generated/ast.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: UrbanTransportationServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.UrbanTransportationValidator;
    validator.registerChecks(registry);
}

/**
 * Implementation of custom validations.
 */
export class UrbanTransportationValidator {

    registerChecks(registry: ValidationRegistry): void {
        registry.register(isBus, this.checkBusStopExists);
        registry.register(isRoute, this.checkRouteStopsExist);
    }

    checkBusStopExists(bus: Bus, accept: ValidationAcceptor): void {
        if (!bus.atStop) {
            accept('error', `Bus '${bus.name}' references an undefined stop.`, { node: bus, property: 'atStop' });
        }
    }

    checkRouteStopsExist(route: Route, accept: ValidationAcceptor): void {
        if (!route.fromStop) {
            accept('error', `Route '${route.name}' references an undefined fromStop.`, { node: route, property: 'fromStop' });
        }
        if (!route.toStop) {
            accept('error', `Route '${route.name}' references an undefined toStop.`, { node: route, property: 'toStop' });
        }
    }
}
