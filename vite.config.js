import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/auth'
    ]
  },
  build: {
    rollupOptions: {
      external: ['firebase']
    }
  }
});
