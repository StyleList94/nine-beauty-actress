/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import sexyDeclareType from 'vite-plugin-sexy-declare-type';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sexyDeclareType(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
        styles: resolve(__dirname, 'lib/core/styles.ts'),
        tokens: resolve(__dirname, 'lib/core/tokens.ts'),
      },
      name: 'NineBeautyActress',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.es.js`,
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^react\/.*/,
        /^motion\/.*/,
      ],
      output: {
        chunkFileNames: 'bundle/[name]-[hash].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          motion: 'motion',
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
});
