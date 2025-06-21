// Easter Eggs Module Index
import { getConsoleMessageCode, consoleMessageDocumentation } from './console-message';
import { getKonamiCodeCode, konamiCodeDocumentation } from './konami-code';
import { getClickCounterCode, clickCounterDocumentation } from './click-counter';
import { getKeySequenceCode, keySequenceDocumentation } from './key-sequence';
import { getMouseShakeCode, mouseShakeDocumentation } from './mouse-shake';
import { getCursorFollowersCode, cursorFollowersDocumentation } from './cursor-followers';
import { getGravityModeCode, gravityModeDocumentation } from './gravity-mode';
import { getMatrixRainCode, matrixRainDocumentation } from './matrix-rain';
import { AdditionalOptions } from '../generator';

// Easter egg registry
export const easterEggRegistry = {
  'console-message': {
    generator: getConsoleMessageCode,
    documentation: consoleMessageDocumentation,
    optionsKey: 'consoleMessage' as keyof AdditionalOptions
  },
  'konami-code': {
    generator: getKonamiCodeCode,
    documentation: konamiCodeDocumentation,
    optionsKey: 'konamiCode' as keyof AdditionalOptions
  },
  'click-counter': {
    generator: getClickCounterCode,
    documentation: clickCounterDocumentation,
    optionsKey: 'clickCounter' as keyof AdditionalOptions
  },
  'key-sequence': {
    generator: getKeySequenceCode,
    documentation: keySequenceDocumentation,
    optionsKey: 'keySequence' as keyof AdditionalOptions
  },
  'mouse-shake': {
    generator: getMouseShakeCode,
    documentation: mouseShakeDocumentation,
    optionsKey: null // No options needed
  },
  'cursor-followers': {
    generator: getCursorFollowersCode,
    documentation: cursorFollowersDocumentation,
    optionsKey: 'cursorFollowers' as keyof AdditionalOptions
  },
  'gravity-mode': {
    generator: getGravityModeCode,
    documentation: gravityModeDocumentation,
    optionsKey: null // No options needed
  },
  'matrix-rain': {
    generator: getMatrixRainCode,
    documentation: matrixRainDocumentation,
    optionsKey: null // No options needed
  }
};

// Helper function to get easter egg code using the registry
export function getEasterEggCode(eggType: string, options: AdditionalOptions): string {
  const easterEgg = easterEggRegistry[eggType as keyof typeof easterEggRegistry];
  
  if (!easterEgg) {
    console.warn(`Unknown easter egg type: ${eggType}`);
    return '';
  }
  
  // Get the specific options for this easter egg type
  if (easterEgg.optionsKey && options[easterEgg.optionsKey]) {
    const eggOptions = options[easterEgg.optionsKey];
    return (easterEgg.generator as any)(eggOptions);
  }
  
  return (easterEgg.generator as any)();
}

// Helper function to get easter egg documentation
export function getEasterEggDocumentation(eggType: string, options?: AdditionalOptions): string {
  const easterEgg = easterEggRegistry[eggType as keyof typeof easterEggRegistry];
  
  if (!easterEgg) {
    return `### ${eggType}\nCustom easter egg activated!`;
  }
  
  const doc = easterEgg.documentation;
  const emoji = doc.emoji;
  const name = doc.name;
  
  if (typeof doc.description === 'function' && options && easterEgg.optionsKey) {
    const eggOptions = options[easterEgg.optionsKey];
    const description = doc.description(eggOptions);
    return `### ${emoji} ${name}\n${description}`;
  } else if (typeof doc.description === 'string') {
    return `### ${emoji} ${name}\n${doc.description}`;
  }
  
  return `### ${emoji} ${name}\nCustom easter egg activated!`;
}

// Export individual generators for direct use if needed
export {
  getConsoleMessageCode,
  getKonamiCodeCode,
  getClickCounterCode,
  getKeySequenceCode,
  getMouseShakeCode,
  getCursorFollowersCode,
  getGravityModeCode,
  getMatrixRainCode
};
