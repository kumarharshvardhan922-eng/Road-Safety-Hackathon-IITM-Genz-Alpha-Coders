import { initChatbot } from './chatbot.js';

// Wait for DOM to load, then initialize the chatbot in our designated div
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('roadsos-chatbot-root');
  if (root) {
    initChatbot(root);
  } else {
    console.error("Chatbot root element not found on page.");
  }
});
