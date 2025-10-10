import { useEffect, useState } from 'react';

/**
 * 컴포넌트가 클라이언트에 완전히 마운트 되는 상태를 추적합니다.
 * @returns 컴포넌트가 마운트되었는지 여부
 */
export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
