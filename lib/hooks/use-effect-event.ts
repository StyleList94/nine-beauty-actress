import { useCallback, useInsertionEffect, useRef } from 'react';

/* 비반응형 로직을 Effect에서 추출할 때 사용합니다. */
export default function useEffectEvent(fn: (...args: never[]) => unknown) {
  const functionRef = useRef(fn);

  useInsertionEffect(() => {
    functionRef.current = fn;
  }, []);

  return useCallback((...args: never[]) => functionRef.current(...args), []);
}
