import { ConsoleMessageOptions } from '../generator';

export function getConsoleMessageCode(options: ConsoleMessageOptions = {}): string {
  const customMessage = options.customMessage || '';
  
  return `
  // Console Message Easter Egg
  function initConsoleMessage() {
    const companyName = EASTER_EGG_CONFIG.companyName || 'Your Company';
    const website = EASTER_EGG_CONFIG.website || 'https://example.com';
    const description = EASTER_EGG_CONFIG.description || 'Building amazing things with code';
    
    // ASCII Art Header
    const asciiArt = \`
🤖 Welcome to the \${companyName}! 🤖
    
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█                                                           █
█   "\${description}"                                        █
█                                                           █
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

Visit \${website} to explore more!
Type 'companyInfo()' in the console for more details.
\`;

    // Display the main ASCII art message
    console.log('%c' + asciiArt, 'color: #ff6b6b; font-family: monospace; font-size: 12px; line-height: 1.2;');
    
    // Add custom message if provided
    ${customMessage ? `
    setTimeout(() => {
      console.log('%c' + '${customMessage}', 'color: #4ecdc4; font-size: 14px; font-weight: bold;');
    }, 1000);
    ` : ''}
    
    // Create interactive function for more info
    window.companyInfo = function() {
      // Track this easter egg as discovered only when function is called
      showNotification('🖥️ Console Easter Egg discovered! Great detective work!', 'console-message');
      
      // Mark this easter egg as discovered
      const marker = document.createElement('div');
      marker.setAttribute('data-easter-egg-triggered', 'true');
      marker.setAttribute('data-easter-egg-type', 'console-message');
      marker.style.display = 'none';
      document.body.appendChild(marker);
      
      console.group('%c📊 Company Information', 'color: #45b7d1; font-size: 16px; font-weight: bold;');
      console.log('%c🏢 Company:', 'color: #96ceb4; font-weight: bold;', companyName);
      console.log('%c🌐 Website:', 'color: #96ceb4; font-weight: bold;', website);
      console.log('%c📝 Description:', 'color: #96ceb4; font-weight: bold;', description);
      console.log('%c⏰ Generated:', 'color: #96ceb4; font-weight: bold;', new Date(EASTER_EGG_CONFIG.generatedAt).toLocaleString());
      console.log('%c🎯 Easter Eggs Active:', 'color: #96ceb4; font-weight: bold;', 'Console Message ✓');
      console.groupEnd();
      console.log('%c💡 Tip: Check for more hidden features!', 'color: #feca57; font-style: italic;');
    };
  }
`;
}

export const consoleMessageDocumentation = {
  name: 'Console Message',
  emoji: '🖥️',
  description: 'Check your browser\'s developer console for welcoming messages!'
};
