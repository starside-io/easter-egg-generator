export function getMouseShakeCode(): string {
  return `
  // Mouse Shake Easter Egg
  function initMouseShake() {
    let mousePositions = [];
    let shakeThreshold = 300; // Increased from 100
    let minShakeTime = 200; // Minimum time to build up shake
    let isShaking = false;
    
    // Event Listeners Section - Extract for consolidation
    const eventListeners = {
      mousemove: function(e) {
        mousePositions.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Keep only recent positions (last 800ms, increased from 500ms)
        mousePositions = mousePositions.filter(pos => Date.now() - pos.time < 800);
        
        // Need more positions and minimum time to detect shake
        if (mousePositions.length < 20) return; // Increased from 10
        
        const currentTime = Date.now();
        const oldestTime = mousePositions[0].time;
        
        // Must have been shaking for at least minShakeTime
        if (currentTime - oldestTime < minShakeTime) return;
        
        // Calculate movement intensity and direction changes
        let totalMovement = 0;
        let directionChanges = 0;
        let lastDirection = null;
        
        for (let i = 1; i < mousePositions.length; i++) {
          const dx = mousePositions[i].x - mousePositions[i-1].x;
          const dy = mousePositions[i].y - mousePositions[i-1].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          totalMovement += distance;
          
          // Track direction changes (key indicator of shaking)
          if (distance > 5) { // Only count significant movements
            const currentDirection = Math.atan2(dy, dx);
            if (lastDirection !== null) {
              const angleDiff = Math.abs(currentDirection - lastDirection);
              if (angleDiff > Math.PI / 2 && angleDiff < 3 * Math.PI / 2) {
                directionChanges++;
              }
            }
            lastDirection = currentDirection;
          }
        }
        
        // Require both high movement AND frequent direction changes
        if (totalMovement > shakeThreshold && directionChanges > 8 && !isShaking) {
          isShaking = true;
          showNotification('🐭 Whoa! Shake that mouse! You found the shake easter egg!', 'mouse-shake');
          
          // Mark this easter egg as discovered
          const marker = document.createElement('div');
          marker.setAttribute('data-easter-egg-triggered', 'true');
          marker.setAttribute('data-easter-egg-type', 'mouse-shake');
          marker.style.display = 'none';
          document.body.appendChild(marker);
          
          // Add screen shake effect
          document.body.style.animation = 'screen-shake 0.5s ease-in-out';
          
          const style = document.createElement('style');
          style.textContent = \`
            @keyframes screen-shake {
              0%, 100% { transform: translateX(0); }
              10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
              20%, 40%, 60%, 80% { transform: translateX(2px); }
            }
          \`;
          document.head.appendChild(style);
          
          setTimeout(() => {
            document.body.style.animation = '';
            isShaking = false; // Allow re-triggering
          }, 500);
          
          // Clear positions to prevent immediate re-triggering
          mousePositions = [];
        }
      }
    };
    
    // Register with consolidated event listener system
    registerConsolidatedEventListener('mousemove', eventListeners.mousemove, 'mouse-shake');
  }
`;
}

export const mouseShakeDocumentation = {
  name: 'Mouse Shake',
  emoji: '🐭',
  description: 'Shake your mouse rapidly back and forth to trigger a fun surprise!'
};
