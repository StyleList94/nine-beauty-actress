import { useCallback, useInsertionEffect, useRef } from 'react';

/**
 * 비반응형 로직을 Effect에서 추출할 때 사용합니다.
 * @param fn - Effect 이벤트로 사용할 함수
 * @returns Effect 이벤트 함수
 * @deprecated React 19.2 에서 안정화 되었기 때문에, 다음 메이저 버전에서 삭제될 예정입니다.
 */
export default function useEffectEvent(fn: (...args: never[]) => unknown) {
  const functionRef = useRef(fn);

  useInsertionEffect(() => {
    functionRef.current = fn;
  }, []);

  return useCallback((...args: never[]) => functionRef.current(...args), []);
}
