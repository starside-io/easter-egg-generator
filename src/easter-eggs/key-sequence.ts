import { KeySequenceOptions } from '../generator';

export function getKeySequenceCode(options: KeySequenceOptions = { keySequence: 'secret' }): string {
  const keySequence = options.keySequence || 'secret';
  
  return `
  // Key Sequence Easter Egg
  function initKeySequence() {
    const targetSequence = '${keySequence}'.toLowerCase();
    let currentSequence = '';
    let lastKeyTime = 0;
    
    // Event Listeners Section - Extract for consolidation
    const eventListeners = {
      keydown: function(e) {
        const currentTime = Date.now();
        
        // Reset if too much time has passed
        if (currentTime - lastKeyTime > 2000) {
          currentSequence = '';
        }
        
        lastKeyTime = currentTime;
        
        // Only capture letter keys
        if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
          currentSequence += e.key.toLowerCase();
          
          // Keep only the last n characters
          if (currentSequence.length > targetSequence.length) {
            currentSequence = currentSequence.slice(-targetSequence.length);
          }
          
          if (currentSequence === targetSequence) {
            showNotification(\`🔐 Secret code "\${targetSequence}" entered! You're awesome!\`, 'key-sequence');
            currentSequence = ''; // Reset for repeatability
            
            // Mark this easter egg as discovered
            const marker = document.createElement('div');
            marker.setAttribute('data-easter-egg-triggered', 'true');
            marker.setAttribute('data-easter-egg-type', 'key-sequence');
            marker.style.display = 'none';
            document.body.appendChild(marker);
            
            // Add sparkle effect
            createSparkles();
          }
        }
      }
    };
    
    // Register with consolidated event listener system
    registerConsolidatedEventListener('keydown', eventListeners.keydown, 'key-sequence');
  }
  
  function createSparkles() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = \`
          position: fixed;
          top: \${Math.random() * window.innerHeight}px;
          left: \${Math.random() * window.innerWidth}px;
          font-size: 20px;
          pointer-events: none;
          z-index: 10000;
          animation: sparkle 2s ease-out forwards;
        \`;
        
        const style = document.createElement('style');
        style.textContent = \`
          @keyframes sparkle {
            0% { opacity: 1; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
            100% { opacity: 0; transform: scale(0) rotate(360deg); }
          }
        \`;
        document.head.appendChild(style);
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 2000);
      }, i * 100);
    }
  }
`;
}

export const keySequenceDocumentation = {
  name: 'Key Sequence',
  emoji: '⌨️',
  description: (options: KeySequenceOptions) => {
    const sequence = options.keySequence || 'secret';
    return `Type "${sequence}" anywhere on the page to activate the easter egg!`;
  }
};
