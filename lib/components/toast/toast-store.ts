import { type ReactNode, useSyncExternalStore } from 'react';

export type ToastVariant = 'default' | 'destructive';

export type ToastData = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  action?: ReactNode;
  /** 자동 닫힘 시간(ms). 0이면 자동으로 닫히지 않습니다. 기본값 5000ms */
  duration?: number;
  open: boolean;
};

type ToastInput = Omit<ToastData, 'id' | 'open'>;

const ANIMATION_DURATION = 300;

let toasts: ToastData[] = [];
const listeners = new Set<() => void>();
let counter = 0;

function notify() {
  listeners.forEach((listener) => listener());
}

function generateId(): string {
  counter += 1;
  return `toast-${counter}-${Date.now()}`;
}

function remove(id: string): void {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export function dismiss(id: string): void {
  toasts = toasts.map((t) =>
    t.id === id ? { ...t, open: false } : t,
  );
  notify();

  setTimeout(() => remove(id), ANIMATION_DURATION);
}

export function toast(input: ToastInput): string {
  const id = generateId();
  toasts = [...toasts, { ...input, id, open: true }];
  notify();

  return id;
}

toast.dismiss = dismiss;

export function dismissAll(): void {
  toasts = toasts.map((t) => ({ ...t, open: false }));
  notify();

  setTimeout(() => {
    toasts = [];
    notify();
  }, ANIMATION_DURATION);
}

function getSnapshot(): ToastData[] {
  return toasts;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function useToastStore(): ToastData[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
