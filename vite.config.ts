/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import dtsPlugin from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dtsPlugin({ include: ['lib'], insertTypesEntry: true }),
    cssInjectedByJsPlugin(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'NineBeautyActress',
      formats: ['es', 'umd'],
      fileName: (format) => `nine-beauty-actress.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
    copyPublicDir: false,
  },
  resolve: {
    alias: [
      { find: 'lib', replacement: resolve(__dirname, './lib') },
      { find: 'src', replacement: resolve(__dirname, './src') },
    ],
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
