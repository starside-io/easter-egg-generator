export interface CursorFollowersOptions {
  eggEmoji?: string;
}

export function getCursorFollowersCode(options: CursorFollowersOptions = {}): string {
  const { eggEmoji = '🥚' } = options;
  
  return `
  // Cursor Followers Easter Egg
  function initCursorFollowers() {
    let followerElement = null;
    const eggEmoji = '${eggEmoji}';
    let allEasterEggsFound = false;
    
    // Check if all easter eggs have been found (excluding cursor followers itself and auto-triggered ones)
    function checkAllEasterEggsFound() {
      // Count only interactive easter eggs (exclude cursor followers and auto-triggered ones like matrix-rain, gravity-mode)
      const triggers = document.querySelectorAll('[data-easter-egg-triggered="true"]:not([data-easter-egg-type="cursor-followers"]):not([data-easter-egg-type="matrix-rain"]):not([data-easter-egg-type="gravity-mode"])');
      
      // We need at least 3 interactive easter eggs to be found
      // This includes: console-message, konami-code, click-counter, key-sequence, mouse-shake, disco-mode
      return triggers.length >= 3;
    }
    
    // Create the cursor follower
    function createCursorFollower() {
      // Remove existing follower if any
      if (followerElement) {
        followerElement.remove();
      }
      
      followerElement = document.createElement('div');
      followerElement.innerHTML = eggEmoji;
      followerElement.id = 'cursor-follower';
      followerElement.style.cssText = \`
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        user-select: none;
        left: 50%;
        top: 50%;
      \`;
      
      document.body.appendChild(followerElement);
      
      // Mark cursor followers as triggered
      const marker = document.createElement('div');
      marker.setAttribute('data-easter-egg-triggered', 'true');
      marker.setAttribute('data-easter-egg-type', 'cursor-followers');
      marker.style.display = 'none';
      document.body.appendChild(marker);
      
      showNotification(\`\${eggEmoji} Cursor follower activated! All easter eggs found!\`, 'cursor-followers');
    }
    
    // Check for easter eggs on meaningful events (not mouse movement)
    function checkAndActivateIfReady() {
      if (!allEasterEggsFound) {
        allEasterEggsFound = checkAllEasterEggsFound();
        if (allEasterEggsFound) {
          createCursorFollower();
        }
      }
    }
    
    // Event Listeners Section - Extract for consolidation
    const eventListeners = {
      mousemove: function(e) {
        if (!allEasterEggsFound) {
          return; // Don't check on every mouse move, only on meaningful events
        }
        
        // Move the follower to mouse position
        if (followerElement) {
          const { clientX, clientY } = e;
          
          followerElement.animate({
            left: \`\${clientX}px\`,
            top: \`\${clientY}px\`
          }, { duration: 500, fill: "forwards" });
        }
      },
      
      click: function(e) {
        checkAndActivateIfReady();
      }
    };
    
    // Register with consolidated event listener system
    registerConsolidatedEventListener('mousemove', eventListeners.mousemove, 'cursor-followers');
    registerConsolidatedEventListener('click', eventListeners.click, 'cursor-followers');
    
    // Use a MutationObserver to detect when easter egg markers are added
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE && 
                node.hasAttribute && 
                node.hasAttribute('data-easter-egg-triggered')) {
              checkAndActivateIfReady();
            }
          });
        }
      });
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Cleanup function
    window.removeCursorFollowers = function() {
      if (followerElement) {
        followerElement.remove();
        followerElement = null;
      }
    };
  }
`;
}

export const cursorFollowersDocumentation = {
  name: 'Cursor Followers',
  emoji: '🥚',
  description: (options: CursorFollowersOptions = {}) => {
    const { eggEmoji = '🥚' } = options;
    return `Spawns a ${eggEmoji} emoji that follows your mouse cursor around the screen! Activates when all other easter eggs are found.`;
  }
};
