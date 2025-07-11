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
    reactDocgen: 'react-docgen',
  },

  async viteFinal(viteConfig) {
    const { mergeConfig, defineConfig } = await import('vite');
    const { default: tailwindcss } = await import('@tailwindcss/vite');

    return mergeConfig(
      viteConfig,
      defineConfig({
        plugins: [tailwindcss()],
      }),
    );
  },
};
export default config;
