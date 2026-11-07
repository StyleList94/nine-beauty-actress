import { use } from 'react';
import { browser } from 'react-dom';

/**
 * 브라우저 전용 렌더링을 위한 호환 훅입니다.
 * @deprecated React 19.3의 `use(browser())`와 상위 `Suspense`를 직접 사용하세요.
 * @remarks 서버에서는 가장 가까운 Suspense fallback을 표시하며,
 * 브라우저에서는 첫 렌더부터 true를 반환합니다. DOM 커밋 완료를 의미하지 않습니다.
 * @returns 브라우저에서 렌더링할 수 있으면 true
 */
export default function useMounted() {
  use(browser());
  return true;
}
