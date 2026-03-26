import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const rootSrc = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  // Required for Capacitor WebView asset paths (relative URLs)
  base: './',
  build: {
    outDir: 'build',
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': rootSrc,
    },
  },
});
