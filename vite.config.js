import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://driversonhire.com',
        changeOrigin: true,
        secure: false, // If you're using HTTPS and have self-signed certificates
      }
    }
  }
});
