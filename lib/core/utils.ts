import { type Ref } from 'react';
import { clsx, type ClassValue } from 'clsx';

export const cn = (...args: ClassValue[]) => clsx(args);

/**
 * 여러 ref를 하나의 콜백 ref로 합칩니다.
 *
 * @remarks
 * - 콜백 ref와 객체 ref(`RefObject`) 모두 지원
 * - `undefined`인 ref는 자동으로 무시
 *
 * @example
 * ```tsx
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * <button ref={mergeRefs(buttonRef, forwardedRef)} />
 * ```
 */
export const mergeRefs =
  <T>(...refs: (Ref<T> | undefined)[]): ((node: T | null) => void) =>
  (node) =>
    refs
      .filter((ref): ref is NonNullable<typeof ref> => ref != null)
      .forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          const mutableRef = ref as { current: T | null };
          mutableRef.current = node;
        }
      });

export const isFileAccepted = (file: File, accept?: string) => {
  if (!accept) return true; // accept 미설정 시 모두 허용

  const acceptList = accept.split(',').map((s) => s.trim().toLowerCase());

  const fileMime = file.type.toLowerCase();
  const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;

  return acceptList.some((acceptItem) => {
    if (acceptItem.startsWith('.')) {
      // 확장자 비교
      return fileExt === acceptItem;
    }
    if (acceptItem.endsWith('/*')) {
      // 와일드카드 MIME 타입 비교 (예: image/*)
      const baseType = acceptItem.replace('/*', '');
      return fileMime.startsWith(baseType);
    }
    // 정확한 MIME 타입 비교
    return fileMime === acceptItem;
  });
};

/**
 * 지정한 시간(ms) 동안 호출이 없을 때만 함수를 실행합니다.
 *
 * @param func - 디바운스할 함수
 * @param wait - 대기 시간 (밀리초)
 * @returns 디바운스된 함수
 *
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   fetch(`/api/search?q=${query}`);
 * }, 300);
 * ```
 */
export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
