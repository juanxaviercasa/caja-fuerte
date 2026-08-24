import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets so dist/index.html works cleanly
  server: {
    port: 5173,
    open: true
  }
});
