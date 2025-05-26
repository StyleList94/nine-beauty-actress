import { useEffect, useState } from 'react';

/* `delay`(ms) 동안 입력 된 `value`를 디바운싱 합니다. */
export default function useDebounce<T = string>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
