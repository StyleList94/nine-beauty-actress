import { type ReactNode, useSyncExternalStore } from 'react';

export type ToastVariant = 'default' | 'destructive';

export type ToastData = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  action?: ReactNode;
  duration?: number;
};

type ToastInput = Omit<ToastData, 'id'>;

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

export function dismiss(id: string): void {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export function toast(input: ToastInput): string {
  const id = generateId();
  toasts = [...toasts, { ...input, id }];
  notify();

  const duration = input.duration ?? 5000;
  if (duration > 0) {
    setTimeout(() => dismiss(id), duration);
  }

  return id;
}

toast.dismiss = dismiss;

export function dismissAll(): void {
  toasts = [];
  notify();
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
