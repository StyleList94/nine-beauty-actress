import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-themes',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: './tsconfig.node.json',
    },
  },

  async viteFinal(config) {
    const { mergeConfig, defineConfig } = await import('vite');
    const { default: tailwindcss } = await import('@tailwindcss/vite');

    return mergeConfig(
      config,
      defineConfig({
        plugins: [tailwindcss()],
      }),
    );
  },
};
export default config;
