import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 50000,
  },
  // server: {
  //   port: 5173,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000', // Your backend server URL
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''), // Optional, keeps the /dashboards prefix in requests
  //     },
  //   },
  // },
});
