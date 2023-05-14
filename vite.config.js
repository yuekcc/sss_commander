import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/public/',
  build: {
    outDir: './public',
  },
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
      },
      '^/apps/.+/api': {
        target: 'http://127.0.0.1:3000',
      },
    },
  },
});
