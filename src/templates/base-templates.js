// Example template files for easter eggs
// These can be used as reference or starting points for new easter egg types

module.exports = {
  // Basic notification template
  notification: `
    function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = 'easter-egg-notification';
      notification.textContent = message;
      notification.style.cssText = getNotificationStyles(type);
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 4000);
    }
  `,
  
  // Animation utilities
  animations: `
    function addGlobalStyles() {
      if (document.getElementById('easter-egg-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'easter-egg-styles';
      style.textContent = \`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; }
        }
        .easter-egg-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          animation: slideIn 0.3s ease-out;
        }
      \`;
      document.head.appendChild(style);
    }
  `,
  
  // Event utility
  events: `
    function throttle(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
    
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  `
};
