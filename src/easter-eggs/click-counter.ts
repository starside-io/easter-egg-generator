import { ClickCounterOptions } from '../generator';

export function getClickCounterCode(options: ClickCounterOptions = { targetSelector: '.logo', clickCount: 10 }): string {
  const targetSelector = options.targetSelector || '.logo';
  const clickCount = options.clickCount || 10;
  
  return `
  // Click Counter Easter Egg
  function initClickCounter() {
    let clicks = 0;
    const target = document.querySelector('${targetSelector}');
    
    if (!target) {
      console.warn('Easter egg target "${targetSelector}" not found');
      return;
    }
    
    // Event Listeners Section - Extract for consolidation
    const eventListeners = {
      click: function(e) {
        // Only handle clicks on the target element
        if (!e.target.matches('${targetSelector}')) return;
        
        clicks++;
        
        if (clicks === Math.floor(${clickCount} / 2)) {
          showNotification(\`Keep clicking... \${${clickCount} - clicks} more to go! 🤔\`);
        } else if (clicks >= ${clickCount}) {
          showNotification('🎉 You found the secret! Thanks for being persistent!', 'click-counter');
          
          // Mark this easter egg as discovered
          const marker = document.createElement('div');
          marker.setAttribute('data-easter-egg-triggered', 'true');
          marker.setAttribute('data-easter-egg-type', 'click-counter');
          marker.style.display = 'none';
          document.body.appendChild(marker);
          
          // Add celebration effect
          target.style.animation = 'bounce 0.6s ease-in-out';
          
          const style = document.createElement('style');
          style.textContent = \`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          \`;
          document.head.appendChild(style);
          
          setTimeout(() => {
            target.style.animation = '';
          }, 600);
          
          clicks = 0; // Reset counter for repeatability
        }
      }
    };
    
    // Register with consolidated event listener system (using document-level delegation)
    registerConsolidatedEventListener('click', eventListeners.click, 'click-counter');
  }
`;
}

export const clickCounterDocumentation = {
  name: 'Click Counter',
  emoji: '👆',
  description: (options: ClickCounterOptions) => {
    const selector = options.targetSelector || '.logo';
    const count = options.clickCount || 10;
    return `Click the element "${selector}" ${count} times to reveal the secret!`;
  }
};
