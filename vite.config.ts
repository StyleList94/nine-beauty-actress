/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import sexyDeclareType from 'vite-plugin-sexy-declare-type';
import { playwright } from '@vitest/browser-playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sexyDeclareType(), vanillaExtractPlugin()],
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'html'],
      include: ['lib/**/*.{ts,tsx}'],
      exclude: [
        'lib/**/*.css.ts',
        'lib/main.ts',
        'lib/core/styles.ts',
        'lib/core/tokens.ts',
        'lib/core/styles/**',
      ],
      reportsDirectory: './coverage',
    },
    projects: [
      {
        plugins: [react(), vanillaExtractPlugin()],
        resolve: {
          alias: [
            { find: 'lib', replacement: resolve(__dirname, './lib') },
            { find: 'src', replacement: resolve(__dirname, './src') },
          ],
        },
        test: {
          name: 'unit',
          include: ['src/tests/**/*.test.{ts,tsx}'],
          globals: true,
          environment: 'jsdom',
          css: true,
        },
      },
      {
        plugins: [react(), vanillaExtractPlugin()],
        resolve: {
          alias: [
            { find: 'lib', replacement: resolve(__dirname, './lib') },
            { find: 'src', replacement: resolve(__dirname, './src') },
          ],
        },
        optimizeDeps: {
          include: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@vanilla-extract/recipes/createRuntimeFn',
            'cmdk',
            'lucide-react',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-switch',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
        },
        test: {
          name: 'browser',
          include: ['src/tests/**/*.spec.tsx'],
          globals: true,
          css: true,
          browser: {
            enabled: true,
            provider: playwright(),
            testerHtmlPath: './src/tests/browser.html',
            instances: [{ browser: 'chromium' }],
            screenshotFailures: false,
          },
        },
      },
    ],
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
