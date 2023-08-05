import { render, screen } from '@testing-library/react';

import { Button } from '../Button';

describe('Button', () => {
  it('should be render', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button', { name: /Click/i })).toBeInTheDocument();
  });
});
