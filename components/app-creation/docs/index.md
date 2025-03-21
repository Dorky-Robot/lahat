# App Creation Component Documentation (Target Architecture)

This documentation describes the *target architecture* for the app creation components, with a formalized lifecycle for steps enabling more flexible UI transitions and better separation of concerns. **This represents the planned architecture, not the current implementation.**

## Overview

The app creation process consists of multiple steps that guide the user through creating a mini app. This documentation outlines the target architecture for these steps that:

1. Formalizes the lifecycle of each step (start, end, disable, enable, hide, show)
2. Implements event-based communication between steps
3. Simplifies the controller to act as a dumb event relay
4. Makes steps truly self-contained "black boxes"

**Note: The current implementation is simpler and represents a transition state towards this target architecture. See [Current Implementation](./current-implementation.md) for detailed documentation of the current code implementation.**

## Documentation Sections

### [Current Implementation](./current-implementation.md)
Detailed documentation of the current implementation as of March 2025.

### [Step Lifecycle](./step-lifecycle.md)

Defines the formal lifecycle interface for steps in the app creation process, including:

- Lifecycle methods (start, end, disable, enable, hide, show)
- Base step component implementation
- CSS considerations for lifecycle states
- Benefits of the lifecycle approach

### [Event-Based Communication](./event-communication.md)

Describes the event-based communication system for steps, including:

- Event format and structure
- Common event actions
- Controller implementation
- Benefits of event-based communication

### [Error Handling](./error-handling.md)

Details the approach for handling errors within step components:

- Error handling principles
- Error state in the step lifecycle
- Error handling methods
- Error notification pattern (escape hatch)
- Implementation in the base step component

### [Controller Refactoring](./controller-refactoring.md)

Outlines the approach for refactoring the app creation controller, including:

- Current controller issues
- Refactoring goals
- Before and after comparison
- Implementation steps
- Benefits of the refactored controller

### [Migration Guide](./migration-guide.md)

Provides a step-by-step guide for migrating existing components, including:

- Creating a base step component
- Updating existing steps
- Refactoring the controller
- Testing and validation
- Common pitfalls and solutions

## Key Benefits

Implementing this architecture provides several benefits:

1. **Improved Flexibility**: Steps can be disabled/enabled rather than completely hidden/shown
2. **Reduced Duplication**: No need to duplicate UI elements in different states
3. **Cleaner Controller**: The controller becomes a simple relay without business logic
4. **Better Encapsulation**: Steps are truly black boxes that communicate only via events
5. **Addressable Steps**: Steps can be targeted by handle for specific actions
6. **Enhanced Maintainability**: Changes to one step don't affect other steps

## Example Use Case

With this new architecture, transitioning from step 1 to step 2 would work like this:

1. Step 1 dispatches an event: `{ action: "disable-self" }`
2. Controller disables step 1 (keeps it visible but non-interactive)
3. Step 1 dispatches an event: `{ action: "start-step", target: "step-two", data: { input: "..." } }`
4. Controller starts step 2 with the provided data
5. Step 2 dispatches an event: `{ action: "show-self" }`
6. Controller shows step 2

This approach keeps both steps visible but only one interactive, eliminating the need to duplicate UI elements.

## Implementation Timeline

The implementation can be done incrementally:

1. Create the base step component and lifecycle interface
2. Update the controller to handle events
3. Update each step component one by one
4. Remove legacy code and finalize the migration

This incremental approach minimizes disruption and allows for testing at each stage.
