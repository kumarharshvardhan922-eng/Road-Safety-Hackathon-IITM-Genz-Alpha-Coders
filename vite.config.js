import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        roadsos: resolve(__dirname, 'frontend/roadsos.html'),
        ambulance: resolve(__dirname, 'frontend/ambulance.html'),
        fire: resolve(__dirname, 'frontend/fire.html'),
        fuel: resolve(__dirname, 'frontend/fuel.html'),
        hospitals: resolve(__dirname, 'frontend/hospitals.html'),
        police: resolve(__dirname, 'frontend/police.html'),
        sos: resolve(__dirname, 'frontend/sos.html'),
        towing: resolve(__dirname, 'frontend/towing.html'),
      },
    },
  },
});
