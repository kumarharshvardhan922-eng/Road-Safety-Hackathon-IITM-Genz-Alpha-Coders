import { initChatbot } from './chatbot.js';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA (Offline Support)
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, please refresh.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});

document.addEventListener('DOMContentLoaded', () => {
  // Page Transition: Fade In
  document.body.classList.add('page-enter-active');

  // Intercept links for fade out transition
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only intercept internal html links
      const href = link.getAttribute('href');
      if (href && href.endsWith('.html')) {
        e.preventDefault();
        document.body.classList.remove('page-enter-active');
        document.body.classList.add('page-leave-active');
        
        setTimeout(() => {
          window.location.href = href;
        }, 300); // 300ms matches the CSS transition time
      }
    });
  });

  // Initialize Chatbot
  const root = document.getElementById('roadsos-chatbot-root');
  if (root) {
    initChatbot(root);
  } else {
    console.error("Chatbot root element not found on page.");
  }
});
