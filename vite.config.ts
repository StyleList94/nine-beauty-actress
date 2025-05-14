/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import dtsPlugin from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dtsPlugin({ include: ['lib'], insertTypesEntry: true })],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'NineBeautyActress',
      formats: ['es', 'umd'],
      fileName: (format) => `nine-beauty-actress.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss', 'motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
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
