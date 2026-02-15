import { cn, isFileAccepted, debounce } from 'lib/core/utils';

describe('cn', () => {
  it('should return a single class', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('should merge multiple classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should ignore falsy values', () => {
    expect(cn('foo', false, null, undefined, 0, '', 'bar')).toBe('foo bar');
  });
});

describe('isFileAccepted', () => {
  const createFile = (name: string, type: string) =>
    new File([''], name, { type });

  it('should accept all files when accept is undefined', () => {
    const file = createFile('test.txt', 'text/plain');
    expect(isFileAccepted(file)).toBe(true);
  });

  it('should match exact MIME type', () => {
    const file = createFile('photo.png', 'image/png');
    expect(isFileAccepted(file, 'image/png')).toBe(true);
  });

  it('should reject non-matching MIME type', () => {
    const file = createFile('doc.pdf', 'application/pdf');
    expect(isFileAccepted(file, 'image/png')).toBe(false);
  });

  it('should match wildcard MIME type', () => {
    const file = createFile('photo.jpg', 'image/jpeg');
    expect(isFileAccepted(file, 'image/*')).toBe(true);
  });

  it('should match file extension', () => {
    const file = createFile('photo.png', 'image/png');
    expect(isFileAccepted(file, '.png')).toBe(true);
  });

  it('should handle multiple accept values separated by comma', () => {
    const png = createFile('photo.png', 'image/png');
    const jpg = createFile('photo.jpg', 'image/jpeg');
    const pdf = createFile('doc.pdf', 'application/pdf');

    expect(isFileAccepted(png, 'image/png, .jpg')).toBe(true);
    expect(isFileAccepted(jpg, 'image/png, .jpg')).toBe(true);
    expect(isFileAccepted(pdf, 'image/png, .jpg')).toBe(false);
  });

  it('should be case insensitive', () => {
    const file = createFile('PHOTO.PNG', 'IMAGE/PNG');
    expect(isFileAccepted(file, 'image/png')).toBe(true);
    expect(isFileAccepted(file, '.png')).toBe(true);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call function after delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('should only execute the last call within delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('should pass arguments correctly', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('hello', 'world');
    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledWith('hello', 'world');
  });

  it('should reset timer on subsequent calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    debounced();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('should use the last arguments when called multiple times', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('first');
    debounced('second');
    debounced('third');

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledWith('third');
  });
});
