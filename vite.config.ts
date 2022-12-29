import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import packageJson from './package.json';
import path from 'path';
import sveltePreprocess from 'svelte-preprocess';
import VitePluginStyleInject from 'vite-plugin-style-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({})
    }),
    VitePluginStyleInject()
  ],
  define: {
    __VERSION__: packageJson.version,
    'process.env.NODE_ENV': '"production"'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      glodash: path.resolve(__dirname, 'src/utils/glodash.ts')
    }
  },
  build: {
    lib: {
      name: 'GioKit',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['umd'],
      fileName: () => 'gioKit.min.js'
    },
    target: 'es2015',
    cssTarget: 'chrome61',
    minify: 'terser',
    terserOptions: {
      format: { comments: false }
    }
  }
});
