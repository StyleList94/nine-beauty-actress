import { renderHook } from '@testing-library/react';

import useMounted from 'lib/hooks/use-mounted';

describe('useMounted', () => {
  it('should return true', () => {
    const { result } = renderHook(() => useMounted());

    expect(result.current).toBe(true);
  });
});
