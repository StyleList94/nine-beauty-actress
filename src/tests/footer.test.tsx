import '@testing-library/jest-dom/vitest';

import { composeStories } from '@storybook/react-vite';

import { render, screen } from '@testing-library/react';

import * as stories from '../stories/Footer.stories';

const { StyleList94, StylishLog } = composeStories(stories);

describe('Header', () => {
  it('should be rendered stylelist94.dev', () => {
    render(<StyleList94 />);

    expect(screen.getByText('Blog')).toHaveAttribute(
      'href',
      'https://blog.stylelist94.dev',
    );

    expect(screen.getByText(/© 2025./)).toBeInTheDocument();
    expect(screen.getByText(/StyleList94/)).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
  });

  it('should be rendered blog.stylelist94.dev', () => {
    render(<StylishLog />);

    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/StyleList94/blog',
    );

    expect(screen.getByText(/© 2025./)).toBeInTheDocument();
    expect(screen.getByText(/StyleList94/)).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
  });
});
