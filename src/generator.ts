import fs from 'fs-extra';
import path from 'path';
import webpack from 'webpack';
import { getEasterEggCode as getModularEasterEggCode, getEasterEggDocumentation } from './easter-eggs';

export interface UserInfo {
  companyName: string;
  website: string;
  description: string;
}

export interface ConsoleMessageOptions {
  customMessage?: string;
}

export interface KonamiCodeOptions {
  successMessage: string;
}

export interface ClickCounterOptions {
  targetSelector: string;
  clickCount: number;
}

export interface KeySequenceOptions {
  keySequence: string;
}

export interface CursorFollowersOptions {
  eggEmoji?: string;
}

export interface AdditionalOptions {
  consoleMessage?: ConsoleMessageOptions;
  konamiCode?: KonamiCodeOptions;
  clickCounter?: ClickCounterOptions;
  keySequence?: KeySequenceOptions;
  cursorFollowers?: CursorFollowersOptions;
  [key: string]: any;
}

export interface EasterEggConfig {
  userInfo: UserInfo;
  selectedEggs: string[];
  additionalOptions: AdditionalOptions;
  outputDir: string;
}

export async function generateEasterEgg(config: EasterEggConfig): Promise<string> {
  const { userInfo, selectedEggs, additionalOptions, outputDir } = config;
  
  // Ensure output directory exists
  await fs.ensureDir(outputDir);
  
  // Generate the JavaScript content
  let jsContent = generateEasterEggContent(userInfo, selectedEggs, additionalOptions);
  
  // Write the raw JavaScript file
  const rawOutputPath = path.join(outputDir, 'easter-eggs-raw.js');
  await fs.writeFile(rawOutputPath, jsContent);
  
  // Bundle and minify the JavaScript
  const bundledOutputPath = path.join(outputDir, 'easter-eggs.js');
  await bundleJavaScript(rawOutputPath, bundledOutputPath);
  
  // Generate documentation
  await generateDocumentation(config, path.join(outputDir, 'README.md'));
  
  // Clean up temporary file
  await fs.remove(rawOutputPath);
  
  return bundledOutputPath;
}

function generateEasterEggContent(userInfo: UserInfo, selectedEggs: string[], additionalOptions: AdditionalOptions): string {
  const { companyName, website, description } = userInfo;
  
  let content = `// Easter Eggs Generated for ${companyName}
// Generated on ${new Date().toISOString()}
// Description: ${description}
${website ? `// Website: ${website}` : ''}

(function() {
  'use strict';
  
  // Easter Egg Configuration
  const EASTER_EGG_CONFIG = {
    companyName: '${companyName}',
    website: '${website}',
    description: '${description}',
    generatedAt: '${new Date().toISOString()}'
  };
  
  // Easter Egg Tracking System
  const EASTER_EGG_TRACKER = {
    discovered: new Set(),
    totalEggs: ${selectedEggs.length},
    markDiscovered: function(eggName) {
      const wasNew = !this.discovered.has(eggName);
      this.discovered.add(eggName);
      
      if (wasNew && this.discovered.size === this.totalEggs) {
        // All eggs found - trigger fireworks!
        setTimeout(() => this.showFireworks(), 1000);
      }
      
      return wasNew;
    },
    getProgress: function() {
      return \`(\${this.discovered.size}/\${this.totalEggs})\`;
    },
    showFireworks: function() {
      showNotification('🎆 CONGRATULATIONS! You found all easter eggs! 🎆');
      this.createFireworks();
    },
    createFireworks: function() {
      // Add fireworks CSS
      const fireworksStyle = document.createElement('style');
      fireworksStyle.id = 'fireworks-style';
      fireworksStyle.textContent = \`
        .fireworks {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        
        .firework {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: firework 2s ease-out forwards;
        }
        
        .firework.red { background: #ff6b6b; }
        .firework.blue { background: #4ecdc4; }
        .firework.yellow { background: #ffe66d; }
        .firework.green { background: #95e1d3; }
        .firework.purple { background: #a8e6cf; }
        .firework.orange { background: #ffb347; }
        
        @keyframes firework {
          0% {
            transform: translateY(100vh) scale(1);
            opacity: 1;
          }
          15% {
            transform: translateY(20vh) scale(1);
            opacity: 1;
          }
          20% {
            transform: translateY(20vh) scale(1);
            opacity: 1;
          }
          25% {
            transform: translateY(20vh) scale(20);
            opacity: 0.8;
          }
          30% {
            transform: translateY(20vh) scale(25);
            opacity: 0.6;
          }
          35% {
            transform: translateY(20vh) scale(30);
            opacity: 0.4;
          }
          100% {
            transform: translateY(20vh) scale(35);
            opacity: 0;
          }
        }
        
        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: gold;
          border-radius: 50%;
          animation: sparkle 3s ease-out forwards;
        }
        
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
        
        .celebration-text {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 3rem;
          font-weight: bold;
          color: gold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          z-index: 10000;
          pointer-events: none;
          animation: celebrate 4s ease-out forwards;
        }
        
        @keyframes celebrate {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
        }
      \`;
      document.head.appendChild(fireworksStyle);
      
      // Create fireworks container
      const fireworksContainer = document.createElement('div');
      fireworksContainer.className = 'fireworks';
      document.body.appendChild(fireworksContainer);
      
      // Create celebration text
      const celebrationText = document.createElement('div');
      celebrationText.className = 'celebration-text';
      celebrationText.textContent = '🎉 ALL EASTER EGGS FOUND! 🎉';
      document.body.appendChild(celebrationText);
      
      // Generate fireworks
      const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const firework = document.createElement('div');
          firework.className = \`firework \${colors[Math.floor(Math.random() * colors.length)]}\`;
          firework.style.left = Math.random() * 100 + '%';
          firework.style.animationDelay = Math.random() * 0.5 + 's';
          fireworksContainer.appendChild(firework);
          
          // Add sparkles around firework
          for (let j = 0; j < 5; j++) {
            setTimeout(() => {
              const sparkle = document.createElement('div');
              sparkle.className = 'sparkle';
              sparkle.style.left = (parseInt(firework.style.left) + (Math.random() - 0.5) * 10) + '%';
              sparkle.style.top = (20 + (Math.random() - 0.5) * 10) + 'vh';
              sparkle.style.animationDelay = Math.random() * 0.5 + 's';
              fireworksContainer.appendChild(sparkle);
              
              setTimeout(() => sparkle.remove(), 3000);
            }, j * 100);
          }
          
          setTimeout(() => firework.remove(), 2000);
        }, i * 200);
      }
      
      // Clean up after animation
      setTimeout(() => {
        fireworksContainer.remove();
        celebrationText.remove();
        fireworksStyle.remove();
      }, 6000);
    }
  };
  
  // Utility Functions
  function log(message, style = '') {
    if (style) {
      console.log('%c' + message, style);
    } else {
      console.log(message);
    }
  }
  
  function showNotification(message, eggName = null) {
    // Track easter egg discovery if provided
    if (eggName) {
      const wasNew = EASTER_EGG_TRACKER.markDiscovered(eggName);
      if (wasNew) {
        message += ' ' + EASTER_EGG_TRACKER.getProgress();
      } else {
        message += ' ' + EASTER_EGG_TRACKER.getProgress() + ' (Already found)';
      }
    }
    
    // Create a simple notification div
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = \`
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
      max-width: 300px;
    \`;
    
    // Add CSS animation
    if (!document.getElementById('easter-egg-styles')) {
      const style = document.createElement('style');
      style.id = 'easter-egg-styles';
      style.textContent = \`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      \`;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }
  
`;

  // Add selected easter eggs
  selectedEggs.forEach(eggType => {
    content += getModularEasterEggCode(eggType, additionalOptions);
  });
  
  content += `
  // Consolidated Event Listener System
  const CONSOLIDATED_EVENT_LISTENERS = {
    mousedown: [],
    mouseup: [],
    mouseleave: [],
    mousemove: [],
    click: [],
    dblclick: [],
    keydown: []
  };
  
  // Function to register consolidated event listeners
  function registerConsolidatedEventListener(eventType, handler, eggName) {
    if (CONSOLIDATED_EVENT_LISTENERS[eventType]) {
      CONSOLIDATED_EVENT_LISTENERS[eventType].push({ handler, eggName });
    }
  }
  
  // Function to setup consolidated event listeners
  function setupConsolidatedEventListeners() {
    Object.keys(CONSOLIDATED_EVENT_LISTENERS).forEach(eventType => {
      if (CONSOLIDATED_EVENT_LISTENERS[eventType].length > 0) {
        const consolidatedHandler = function(e) {
          CONSOLIDATED_EVENT_LISTENERS[eventType].forEach(({ handler, eggName }) => {
            try {
              handler.call(this, e);
            } catch (error) {
              console.warn(\`Error in \${eggName} \${eventType} handler:\`, error);
            }
          });
        };
        
        document.addEventListener(eventType, consolidatedHandler);
        console.log(\`%c🎯 Consolidated \${eventType} listeners: \${CONSOLIDATED_EVENT_LISTENERS[eventType].length}\`, 'color: #4ecdc4; font-size: 12px;');
      }
    });
  }
  
  // Initialize easter eggs when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEasterEggs);
  } else {
    initializeEasterEggs();
  }
  
  function initializeEasterEggs() {
    console.log('%c🥚 Easter eggs loaded for ${companyName}!', 'color: #ff6b6b; font-size: 14px; font-weight: bold;');
    
    ${selectedEggs.map(egg => `init${capitalize(camelize(egg))}();`).join('\n    ')}
    
    // Setup consolidated event listeners after all easter eggs are initialized
    setupConsolidatedEventListeners();
  }
  
})();`;

  return content;
}

async function bundleJavaScript(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const config: webpack.Configuration = {
      entry: path.resolve(inputPath),
      output: {
        path: path.resolve(path.dirname(outputPath)),
        filename: path.basename(outputPath),
      },
      mode: 'production' as const,
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    };

    webpack(config, (err, stats) => {
      if (err || stats?.hasErrors()) {
        reject(err || new Error(stats?.toString()));
      } else {
        resolve();
      }
    });
  });
}

async function generateDocumentation(config: EasterEggConfig, outputPath: string): Promise<void> {
  const { userInfo, selectedEggs, additionalOptions } = config;
  
  const docs = `# Easter Eggs for ${userInfo.companyName}

Generated on: ${new Date().toLocaleString()}

## Description
${userInfo.description}

${userInfo.website ? `## Website\n${userInfo.website}\n` : ''}

## Included Easter Eggs

${selectedEggs.map(egg => getEasterEggDocumentation(egg, additionalOptions)).join('\n\n')}

## Installation

Include the generated JavaScript file in your HTML:

\`\`\`html
<script src="easter-eggs.js"></script>
\`\`\`

Or load it asynchronously:

\`\`\`html
<script>
  const script = document.createElement('script');
  script.src = 'easter-eggs.js';
  script.async = true;
  document.head.appendChild(script);
</script>
\`\`\`

## Browser Support

These easter eggs work in all modern browsers that support:
- ES5+ JavaScript
- CSS3 animations
- DOM manipulation

## Notes

- All easter eggs are non-intrusive and won't interfere with your website's functionality
- Console messages will only appear if developer tools are open
- Easter eggs are automatically initialized when the DOM is ready
- No external dependencies required

---

*Generated with Easter Egg Generator*
`;

  await fs.writeFile(outputPath, docs);
}

// Utility functions
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelize(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
