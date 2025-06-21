# Easter Eggs Modules

This directory contains modular implementations of different easter egg types. Each easter egg is implemented as a separate module to improve maintainability and extensibility.

## Structure

- `index.ts` - Main export file and registry for all easter eggs
- `console-message.ts` - Console message easter egg implementation
- `konami-code.ts` - Konami code sequence easter egg
- `click-counter.ts` - Click counter easter egg
- `key-sequence.ts` - Custom key sequence easter egg
- `mouse-shake.ts` - Mouse shake detection easter egg
- `cursor-followers.ts` - Cursor follower easter egg
- `gravity-mode.ts` - Gravity mode easter egg that makes elements fall
- `matrix-rain.ts` - Matrix digital rain effect easter egg
- `disco-mode.ts` - Disco mode easter egg that flashes background colors

## Adding New Easter Eggs

To add a new easter egg:

1. Create a new file in this directory (e.g., `my-easter-egg.ts`)
2. Implement the generator function and documentation
3. Add it to the registry in `index.ts`

### Example Easter Egg Module

```typescript
import { SomeOptionsInterface } from '../generator';

export function getMyEasterEggCode(options: SomeOptionsInterface = {}): string {
  return `
  // My Custom Easter Egg
  function initMyEasterEgg() {
    // Implementation here
  }
`;
}

export const myEasterEggDocumentation = {
  name: 'My Easter Egg',
  emoji: '🎯',
  description: 'Description of what this easter egg does'
};
```

Then add to the registry in `index.ts`:

```typescript
export const easterEggRegistry = {
  // ...existing entries...
  'my-easter-egg': {
    generator: getMyEasterEggCode,
    documentation: myEasterEggDocumentation,
    optionsKey: 'myEasterEgg' as keyof AdditionalOptions
  }
};
```

## Features

- **Modular Design**: Each easter egg is self-contained in its own module
- **Type Safety**: Full TypeScript support with proper interfaces
- **Documentation**: Each module includes its own documentation metadata
- **Registry System**: Centralized registry for easy management and extension
- **Options Support**: Each easter egg can have its own configuration options

## Usage

The modular easter eggs are used by the main generator through the registry system:

```typescript
import { getEasterEggCode, getEasterEggDocumentation } from './easter-eggs';

// Generate code for an easter egg
const code = getEasterEggCode('console-message', options);

// Generate documentation for an easter egg
const docs = getEasterEggDocumentation('konami-code', options);
```
