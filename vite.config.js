import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 50000,
  },
  server: {
    historyApiFallback: true, // Ensures fallback to index.html for SPAs
  },
});
