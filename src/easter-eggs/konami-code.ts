import { KonamiCodeOptions } from '../generator';

export function getKonamiCodeCode(options: KonamiCodeOptions = { successMessage: '🎮 Konami Code activated! You found the secret!' }): string {
  const successMessage = options.successMessage || '🎮 Konami Code activated! You found the secret!';
  
  return `
  // Konami Code Easter Egg
  function initKonamiCode() {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    let konamiCooldown = false;
    
    // Event Listeners Section - Extract for consolidation
    const eventListeners = {
      keydown: function(e) {
        if (konamiCooldown) return;
        
        if (e.code === konamiCode[konamiIndex]) {
          konamiIndex++;
          if (konamiIndex === konamiCode.length) {
            konamiCooldown = true;
            showNotification('${successMessage}', 'konami-code');
            
            // Mark this easter egg as discovered
            const marker = document.createElement('div');
            marker.setAttribute('data-easter-egg-triggered', 'true');
            marker.setAttribute('data-easter-egg-type', 'konami-code');
            marker.style.display = 'none';
            document.body.appendChild(marker);
            
            // Add some visual flair
            document.body.style.animation = 'konami-flash 1s ease-in-out';
            
            // Add flash animation
            const style = document.createElement('style');
            style.textContent = \`
              @keyframes konami-flash {
                0%, 100% { background-color: inherit; }
                50% { background-color: rgba(255, 107, 107, 0.1); }
              }
            \`;
            document.head.appendChild(style);
            
            setTimeout(() => {
              document.body.style.animation = '';
            }, 1000);
            
            // Reset after cooldown to allow re-triggering
            setTimeout(() => {
              konamiIndex = 0;
              konamiCooldown = false;
            }, 2000);
          }
        } else {
          konamiIndex = 0;
        }
      }
    };
    
    // Register with consolidated event listener system
    registerConsolidatedEventListener('keydown', eventListeners.keydown, 'konami-code');
  }
`;
}

export const konamiCodeDocumentation = {
  name: 'Konami Code',
  emoji: '🎮',
  description: 'Enter the classic Konami code: ↑↑↓↓←→←→BA to activate the easter egg!'
};
