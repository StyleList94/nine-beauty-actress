import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as stories from '../stories/Header.stories';

const { StyleList94, StylishLog } = composeStories(stories);

describe('Header', () => {
  it('should be rendered stylelist94.dev', () => {
    render(<StyleList94 />);

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
    expect(screen.getByText('.DEV')).toBeInTheDocument();

    expect(screen.getAllByRole('link')[1]).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
  });

  it('should be rendered blog.stylelist94.dev', () => {
    render(<StylishLog />);

    expect(screen.getByText('Stylish')).toBeInTheDocument();
    expect(screen.getByText('.LOG')).toBeInTheDocument();
  });
});
