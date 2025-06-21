// Test script for disco mode
import { getDiscoModeCode } from './src/easter-eggs/disco-mode';

console.log('Testing Disco Mode Generation...');

const discoCode = getDiscoModeCode({
  flashSpeed: 150,
  colorPalette: ['#ff0066', '#0066ff', '#66ff00'],
  duration: 5000
});

console.log('Generated code length:', discoCode.length);
console.log('Code preview (first 200 chars):', discoCode.substring(0, 200) + '...');
console.log('✅ Disco mode generation successful!');
