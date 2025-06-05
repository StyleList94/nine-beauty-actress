import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react-vite';

import * as stories from '../stories/AppearanceSwitch.stories';

const { LightDarkTheme } = composeStories(stories);

describe('AppearanceSwitch', () => {
  it('should render and switching', () => {
    render(<LightDarkTheme />);

    const button = screen.getByRole('button', { name: /icon-light-mode/ });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(
      screen.getByRole('button', { name: /icon-dark-mode/ }),
    ).toBeInTheDocument();

    fireEvent.click(button);

    expect(
      screen.getByRole('button', { name: /icon-light-mode/ }),
    ).toBeInTheDocument();
  });
});
