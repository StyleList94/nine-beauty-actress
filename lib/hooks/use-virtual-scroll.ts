import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type UseVirtualScrollParams = {
  /* 렌더링할 요소의 총합 개수 */
  itemCount: number;
  /* 요소의 예상 높이 */
  estimateHeight: number;
  /* 스크롤 대상(body, container) */
  scrollTarget?: 'body' | 'container';
  /* 대상이 컨테이너일 경우, 컨테이너 요소에 대한 ref */
  containerRef?: RefObject<HTMLElement>;
  /* 스크롤 컨테이너 높이에 대한 오프셋 */
  heightOffset?: number;
  /* 상하 보이지 않는 영역에 추가할 요소 개수 */
  buffer?: number;
};

/* 스크롤 가능한 컨테이너에 요소 렌더링을 효율적으로 할 수 있도록 도와줍니다. */
export default function useVirtualScroll({
  itemCount,
  estimateHeight,
  heightOffset = 0,
  scrollTarget = 'container',
  containerRef,
  buffer = 5,
}: UseVirtualScrollParams) {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTarget === 'body') {
        setScrollTop(window.scrollY);
        setViewportHeight(window.innerHeight - heightOffset);
      } else if (containerRef?.current) {
        setScrollTop(containerRef.current.scrollTop);
        setViewportHeight(containerRef.current.clientHeight - heightOffset);
      }
    };

    if (scrollTarget === 'body') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }

    if (containerRef?.current) {
      const node = containerRef.current;
      node.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => node.removeEventListener('scroll', handleScroll);
    }

    return () => {};
  }, [containerRef, heightOffset, scrollTarget]);

  const upperBuffer = Math.floor(buffer / 2);
  const lowerBuffer = Math.ceil(buffer / 2);

  const visibleCount = useMemo(
    () => Math.ceil(viewportHeight / estimateHeight),
    [estimateHeight, viewportHeight],
  );
  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / estimateHeight) - upperBuffer),
    [estimateHeight, scrollTop, upperBuffer],
  );
  const endIndex = useMemo(
    () =>
      Math.min(
        itemCount,
        startIndex + visibleCount + upperBuffer + lowerBuffer,
      ),
    [itemCount, lowerBuffer, startIndex, upperBuffer, visibleCount],
  );

  const getVirtualItems = useCallback(
    () =>
      Array.from({ length: endIndex - startIndex }, (_, i) => ({
        index: startIndex + i,
        startPosition: (startIndex + i) * estimateHeight,
      })),
    [endIndex, estimateHeight, startIndex],
  );

  return {
    itemRange: [startIndex, endIndex],
    getVirtualItems,
  };
}
