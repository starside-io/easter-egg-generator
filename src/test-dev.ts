#!/usr/bin/env node

// Quick test script for development
import { generateEasterEgg } from './generator';
import fs from 'fs-extra';
import path from 'path';

async function quickTest() {
  console.log('🧪 Running comprehensive test with all easter eggs...');
  
  const testConfig = {
    userInfo: {
      companyName: 'Starside Labs',
      website: 'https://starside.io',
      description: '🌟 Our Mission: Democratizing AI through open source tools'
    },
    selectedEggs: [
      'console-message',
      'konami-code', 
      'click-counter',
      'key-sequence',
      'mouse-shake',
      'cursor-followers',
      'gravity-mode',
      'matrix-rain'
    ],
    additionalOptions: {
      consoleMessage: { 
        customMessage: '🚀 Welcome to the future of open source AI tools!' 
      },
      konamiCode: { 
        successMessage: '🎉 Konami Code unlocked! You found the secret developer portal!' 
      },
      clickCounter: {
        targetSelector: '.logo',
        clickCount: 10
      },
      keySequence: {
        keySequence: 'STARSIDE'
      },
      cursorFollowers: {
        eggEmoji: '🥚'
      }
    },
    outputDir: './test'
  };

  try {
    const outputPath = await generateEasterEgg(testConfig);
    console.log('✅ Comprehensive test completed successfully!');
    console.log('📁 Output:', outputPath);
    console.log('🎯 Easter eggs included:');
    console.log('  • Console Message with ASCII art');
    console.log('  • Konami Code (↑↑↓↓←→←→BA)');
    console.log('  • Click Counter (10 clicks on logo)');
    console.log('  • Key Sequence (type "STARSIDE")');
    console.log('  • Mouse Shake detection');
    console.log('  • Cursor Followers (🥚 emojis follow your cursor when all eggs found)');
    console.log('  • Gravity Mode (🌍 scroll to bottom to make elements fall!)');
    console.log('  • Matrix Rain Effect (💊 open DevTools to enter the Matrix!)');
    
    // Update demo.html to include the generated easter eggs
    await updateDemoHtml();
    
    console.log('🌟 Demo.html updated with new easter eggs!');
    console.log('🚀 Open test/demo.html in your browser to test!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

async function updateDemoHtml() {
  const demoPath = path.join(process.cwd(), 'test', 'demo.html');
  let demoContent = await fs.readFile(demoPath, 'utf-8');
  
  // Replace the commented script tag with an active one
  const oldScriptPattern = /<!-- <script src="easter-eggs\.js"><\/script> -->/;
  const newScriptTag = '<script src="easter-eggs.js"></script>';
  
  if (oldScriptPattern.test(demoContent)) {
    demoContent = demoContent.replace(oldScriptPattern, newScriptTag);
  } else {
    // If not found, look for the existing script tag pattern and replace it
    const existingScriptPattern = /<script src="(?:output\/)?easter-eggs\.js"><\/script>/;
    if (existingScriptPattern.test(demoContent)) {
      demoContent = demoContent.replace(existingScriptPattern, newScriptTag);
    } else {
      // If neither pattern found, add it before the demo script
      const demoScriptPattern = /(<script>\s*\/\/ This script simulates)/;
      if (demoScriptPattern.test(demoContent)) {
        demoContent = demoContent.replace(demoScriptPattern, `${newScriptTag}\n    \n    $1`);
      }
    }
  }
  
  // Update the key sequence instruction in the HTML to match our test
  demoContent = demoContent.replace(
    /Type <span class="highlight">secret<\/span>/,
    'Type <span class="highlight">STARSIDE</span>'
  );
  
  // Update click counter instruction to mention the logo specifically
  demoContent = demoContent.replace(
    /Click the egg emoji above 10 times/,
    'Click the egg emoji above 10 times'
  );
  
  await fs.writeFile(demoPath, demoContent);
  console.log('📝 Updated test/demo.html with easter eggs script');
}

quickTest();
