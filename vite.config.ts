import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      glodash: path.resolve(__dirname, 'src/utils/glodash.ts')
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/gioKit.min.js',
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});
