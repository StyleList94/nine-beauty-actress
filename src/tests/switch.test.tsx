import '@testing-library/jest-dom/vitest';

import { composeStories } from '@storybook/react-vite';

import { fireEvent, render, screen } from '@testing-library/react';

import * as stories from '../stories/Switch.stories';

const { LightDarkTheme } = composeStories(stories);

describe('Switch', () => {
  it('should render and switching', () => {
    render(<LightDarkTheme />);

    expect(screen.getByLabelText(/icon-light-mode/)).toBeInTheDocument();

    const button = screen.getByRole('switch');
    fireEvent.click(button);
    expect(screen.getByLabelText(/icon-dark-mode/)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByLabelText(/icon-light-mode/)).toBeInTheDocument();
  });
});
