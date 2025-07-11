import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { MainContainer } from 'lib/components/main-container';

describe('MainContainer', () => {
  it('should be rendered', () => {
    render(
      <MainContainer>
        <p>Crazy Love</p>
      </MainContainer>,
    );

    expect(screen.getByText(/Crazy Love/)).toBeInTheDocument();
  });
});
