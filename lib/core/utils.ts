import { clsx, type ClassValue } from 'clsx';

export const cn = (...args: ClassValue[]) => clsx(args);

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
