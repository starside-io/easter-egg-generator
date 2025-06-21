export function getGravityModeCode(): string {
  return `
  // Gravity Mode Easter Egg
  function initGravityMode() {
    let gravityTriggered = false;
    
    function isAtBottom() {
      return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;
    }
    
    function enableGravityMode() {
      if (gravityTriggered) return;
      gravityTriggered = true;
      
      showNotification('🌍 Gravity Mode Activated! Watch everything fall!', 'gravity-mode');
      
      // Mark this easter egg as discovered
      const marker = document.createElement('div');
      marker.setAttribute('data-easter-egg-triggered', 'true');
      marker.setAttribute('data-easter-egg-type', 'gravity-mode');
      marker.style.display = 'none';
      document.body.appendChild(marker);
      
      // Add gravity styles
      const style = document.createElement('style');
      style.textContent = \`
        .gravity-container {
          overflow: hidden !important;
          position: relative !important;
        }
        
        @keyframes gravityShake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        .gravity-shake {
          animation: gravityShake 0.6s ease-in-out !important;
        }
      \`;
      document.head.appendChild(style);
      
      // Add container class to body
      document.body.classList.add('gravity-container');
      
      // Shake the page first
      document.body.classList.add('gravity-shake');
      
      setTimeout(() => {
        document.body.classList.remove('gravity-shake');
        
        // Get all elements to make fall (excluding script, style, and meta tags)
        const allElements = Array.from(document.querySelectorAll('*')).filter(el => {
          const tagName = el.tagName.toLowerCase();
          const computedStyle = getComputedStyle(el);
          return !['html', 'head', 'body', 'script', 'style', 'meta', 'title', 'link'].includes(tagName) &&
                 !el.hasAttribute('data-easter-egg-triggered') &&
                 computedStyle.position !== 'fixed' &&
                 computedStyle.display !== 'none' &&
                 el.offsetHeight > 0 && el.offsetWidth > 0;
        });
        
        // Limit to prevent performance issues - prioritize visible and larger elements
        const elementsToFall = allElements
          .sort((a, b) => {
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            const aSize = aRect.width * aRect.height;
            const bSize = bRect.width * bRect.height;
            return bSize - aSize; // Larger elements first
          })
          .slice(0, 25); // Limit to 25 elements for performance
        
        // Make elements fall with individual staggered timing and random delays
        elementsToFall.forEach((element, index) => {
          const randomDelay = Math.random() * 1000; // Random delay up to 1 second
          const elementDelay = index * 100; // Base stagger delay
          const totalDelay = randomDelay + elementDelay;
          
          setTimeout(() => {
            if (element && element.parentNode) {
              // Store original position
              const originalTransform = element.style.transform || '';
              const originalTransition = element.style.transition || '';
              
              // Apply bouncing transition with individual timing
              element.style.transition = \`transform 3s linear(
                0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765,
                1, 0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785,
                0.813, 0.848, 0.891 68.2%, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953,
                0.973, 1, 0.988, 0.984, 0.988, 1
              ), opacity 3s ease-out, filter 3s ease-out\`;
              
              // Calculate how far to move down to reach bottom
              const rect = element.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              const distanceToBottom = windowHeight - rect.bottom + 50; // 50px past bottom
              
              // Apply the gravity transform with scaling
              const randomScale = 0.1 + Math.random() * 0.2; // Random scale between 0.1 and 0.3
              element.style.transform = \`translateY(\${distanceToBottom}px) scale(\${randomScale})\`;
              element.style.opacity = '0.3';
              element.style.filter = 'blur(1px)';
              
              // Reset after animation
              setTimeout(() => {
                if (element && element.parentNode) {
                  element.style.transform = originalTransform;
                  element.style.transition = originalTransition;
                  element.style.opacity = '';
                  element.style.filter = '';
                }
              }, 3500);
            }
          }, totalDelay);
        });
        
        // Reset gravity mode after all animations complete
        setTimeout(() => {
          document.body.classList.remove('gravity-container');
          
          // Allow retriggering after a delay
          setTimeout(() => {
            gravityTriggered = false;
          }, 2000);
        }, 8000); // Wait for all animations to complete
        
      }, 500);
    }
    
    // Check if user scrolls to bottom
    function handleScroll() {
      if (isAtBottom() && !gravityTriggered) {
        enableGravityMode();
      }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also check on page load in case already at bottom
    setTimeout(() => {
      if (isAtBottom() && !gravityTriggered) {
        enableGravityMode();
      }
    }, 1000);
  }
`;
}

export const gravityModeDocumentation = {
  name: 'Gravity Mode',
  emoji: '🌍',
  description: 'Scroll to the very bottom of the page to activate gravity mode and watch all elements fall down!'
};
