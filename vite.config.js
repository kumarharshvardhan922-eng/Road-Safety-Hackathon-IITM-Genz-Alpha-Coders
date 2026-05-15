import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ambulance: resolve(__dirname, 'ambulance.html'),
        fire: resolve(__dirname, 'fire.html'),
        fuel: resolve(__dirname, 'fuel.html'),
        hospitals: resolve(__dirname, 'hospitals.html'),
        police: resolve(__dirname, 'police.html'),
        sos: resolve(__dirname, 'sos.html'),
        towing: resolve(__dirname, 'towing.html'),
      },
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,jpeg,jpg}']
      },
      manifest: {
        name: 'Sadak Sathi AI',
        short_name: 'Sadak Sathi',
        description: 'Road Safety AI Emergency Assistant',
        theme_color: '#ef4444',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});
