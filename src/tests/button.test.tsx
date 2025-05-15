import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Button } from 'lib/components/button';

describe('Button', () => {
  it('should be render', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button', { name: /Click/i })).toBeInTheDocument();
  });
});
