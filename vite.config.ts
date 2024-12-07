import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Use Vercel's dev server during local testing
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
