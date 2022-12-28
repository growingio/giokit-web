import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import VitePluginStyleInject from 'vite-plugin-style-inject';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), VitePluginStyleInject()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      glodash: path.resolve(__dirname, 'src/utils/glodash.ts')
    }
  },
  server: {
    open: true
  },
  build: {
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/gioKit.min.js',
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});
