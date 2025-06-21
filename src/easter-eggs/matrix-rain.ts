export function getMatrixRainCode(): string {
  return `
  // Matrix Rain Effect Easter Egg
  function initMatrixRain() {
    let matrixActive = false;
    let matrixInterval = null;
    let canvas = null;
    let ctx = null;
    let columns = [];
    let drops = [];
    let trails = []; // Track character trails for fading effect
    
    // DevTools detection variables
    let devtools = false;
    let threshold = 160;
    
    // Matrix characters (mix of katakana, latin letters, and numbers)
    const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    function createMatrixCanvas() {
      if (canvas) return;
      
      canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '999999';
      canvas.style.pointerEvents = 'none';
      canvas.style.background = 'rgba(0, 0, 0, 0.5)';
      canvas.style.transition = 'opacity 0.8s ease-in-out';
      canvas.style.opacity = '0'; // Start invisible
      canvas.id = 'matrix-rain-canvas';
      
      // Set actual canvas dimensions for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      
      document.body.appendChild(canvas);
    }
    
    function initializeMatrix() {
      const fontSize = 14;
      const columnCount = Math.floor(window.innerWidth / fontSize);
      
      columns.length = 0;
      drops.length = 0;
      trails.length = 0;
      
      for (let i = 0; i < columnCount; i++) {
        columns[i] = i * fontSize;
        drops[i] = Math.floor(Math.random() * window.innerHeight / fontSize);
        trails[i] = []; // Initialize trail array for each column
      }
    }
    
    function drawMatrix() {
      if (!ctx || !canvas) return;
      
      // Clear the entire canvas each frame
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Draw trailing characters first (older/dimmer)
      for (let i = 0; i < trails.length; i++) {
        const trail = trails[i];
        for (let j = 0; j < trail.length; j++) {
          const trailChar = trail[j];
          const age = trailChar.age;
          const opacity = Math.max(0, 1 - age / 15); // Fade over 15 frames
          
          if (opacity > 0) {
            ctx.fillStyle = \`rgba(0, 255, 0, \${opacity * 0.6})\`;
            ctx.font = '14px monospace';
            ctx.fillText(trailChar.char, trailChar.x, trailChar.y);
            trailChar.age++;
          }
        }
        // Remove old trail characters
        trails[i] = trail.filter(t => t.age < 15);
      }
      
      // Draw current/bright characters
      ctx.font = '14px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = columns[i];
        const y = drops[i] * 14;
        
        // Add current character to trail
        if (trails[i]) {
          trails[i].push({
            char: char,
            x: x,
            y: y,
            age: 0
          });
        }
        
        // Add some variation in brightness for current character
        const brightness = Math.random();
        if (brightness > 0.98) {
          ctx.fillStyle = '#fff'; // Bright white for leading characters
        } else if (brightness > 0.95) {
          ctx.fillStyle = '#0f0'; // Bright green
        } else {
          ctx.fillStyle = \`rgba(0, 255, 0, \${0.7 + brightness * 0.3})\`; // Varying green opacity
        }
        
        ctx.fillText(char, x, y);
        
        // Move drop down
        drops[i]++;
        
        // Reset drop to top with some randomness
        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    }
    
    function startMatrixRain() {
      if (matrixActive) return;
      matrixActive = true;
      
      showNotification('💊 Welcome to the Matrix! DevTools detected - entering the code...', 'matrix-rain');
      
      // Mark this easter egg as discovered
      const marker = document.createElement('div');
      marker.setAttribute('data-easter-egg-triggered', 'true');
      marker.setAttribute('data-easter-egg-type', 'matrix-rain');
      marker.style.display = 'none';
      document.body.appendChild(marker);
      
      createMatrixCanvas();
      initializeMatrix();
      
      // Start the animation
      matrixInterval = setInterval(drawMatrix, 35); // ~28 FPS for smooth animation
      
      // Animate the canvas opacity from 0 to 1 (dial-in effect)
      setTimeout(() => {
        if (canvas) {
          canvas.style.opacity = '1';
        }
      }, 50); // Small delay to ensure canvas is ready
      
      // Show console message
      console.log('%c' + 
        '█▄█ █▀█ █░█   ▀█▀ ▄▀█ █▄▀ █▀▀   ▀█▀ █░█ █▀▀   █▀█ █▀▀ █▀▄   █▀█ █ █░░ █░░\\n' +
        '░█░ █▄█ █▄█   ░█░ █▀█ █░█ ██▄   ░█░ █▀█ ██▄   █▀▄ ██▄ █▄▀   █▀▀ █ █▄▄ █▄▄\\n\\n' +
        'The Matrix has you... Follow the white rabbit 🐰\\n' +
        'Press ESC to exit the Matrix', 
        'color: #0f0; font-family: monospace; font-weight: bold; font-size: 12px;'
      );
    }
    
    function stopMatrixRain() {
      if (!matrixActive) return;
      
      matrixActive = false;
      
      if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
      }
      
      if (canvas) {
        // Remove immediately without fade animation
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        canvas = null;
        ctx = null;
      }
      
      // Reset arrays
      columns.length = 0;
      drops.length = 0;
      trails.length = 0;
    }
    
    // DevTools detection functions
    function isDevToolsOpen() {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      // Console detection
      let consoleOpen = false;
      const start = performance.now();
      debugger; // This will pause if DevTools are open
      const end = performance.now();
      consoleOpen = end - start > 100;
      
      return widthThreshold || heightThreshold || consoleOpen;
    }
    
    function handleDevToolsToggle() {
      const isOpen = isDevToolsOpen();
      
      if (isOpen && !devtools) {
        devtools = true;
        startMatrixRain();
      } else if (!isOpen && devtools) {
        devtools = false;
        // Close immediately when DevTools are closed
        stopMatrixRain();
      }
    }
    
    // Keyboard event to stop matrix with ESC
    function handleKeyPress(event) {
      if (event.key === 'Escape' && matrixActive) {
        stopMatrixRain();
        showNotification('👋 Exiting the Matrix... Reality restored!', 'matrix-exit');
      }
    }
    
    // Window resize handler
    function handleResize() {
      if (canvas && matrixActive) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(dpr, dpr);
        initializeMatrix();
      }
    }
    
    // Set up event listeners
    setInterval(handleDevToolsToggle, 500); // Check every 500ms
    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    setTimeout(handleDevToolsToggle, 1000);
  }
`;
}

export const matrixRainDocumentation = {
  name: 'Matrix Rain Effect',
  emoji: '💊',
  description: 'Open your browser DevTools to enter the Matrix and see the classic green digital rain effect!'
};
