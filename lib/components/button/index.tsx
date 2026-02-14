import {
  useCallback,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  LazyMotion,
  domAnimation,
  AnimatePresence,
  type HTMLMotionProps,
} from 'motion/react';
import * as m from 'motion/react-m';
import { Slot } from '@radix-ui/react-slot';

import { cn } from 'lib/core/utils';

import {
  button as buttonRecipe,
  rippleContainer,
  ripple as rippleStyle,
  type ButtonVariants,
} from './style.css';

type RippleItem = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export type ButtonVariant = NonNullable<ButtonVariants>['variant'];
export type ButtonSize = NonNullable<ButtonVariants>['size'];

export type ButtonProps = (
  | (HTMLMotionProps<'button'> & { asChild?: false })
  | (ComponentProps<'button'> & { asChild: true })
) & {
  /**
   * 버튼 스타일을 지정합니다
   * @defaultValue 'default'
   */
  variant?: ButtonVariant;
  /**
   * 버튼 크기를 지정합니다
   * @defaultValue 'md'
   */
  size?: ButtonSize;
  /**
   * Ripple 효과를 비활성화 할 때 지정합니다
   * @defaultValue false
   */
  disableRipple?: boolean;
  /**
   * 자식 요소를 버튼 대신 렌더링합니다
   * @defaultValue false
   */
  asChild?: boolean;
  /** 버튼 내부에 렌더링할 요소를 지정합니다 */
  children?: ReactNode;
};

type ButtonWithRippleProps = HTMLMotionProps<'button'> & {
  variant: ButtonVariant;
  size: ButtonSize;
  disableRipple: boolean;
  children?: ReactNode;
};

function ButtonWithRipple({
  className,
  variant,
  size,
  disableRipple,
  disabled,
  children,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  onBlur,
  onKeyDown,
  onKeyUp,
  ref,
  ...props
}: ButtonWithRippleProps) {
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const idRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const createRipple = useCallback(
    (originX: number, originY: number): void => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const localX = originX - rect.left;
      const localY = originY - rect.top;
      const dx = Math.max(localX, rect.width - localX);
      const dy = Math.max(localY, rect.height - localY);
      const radius = Math.sqrt(dx * dx + dy * dy);
      const rippleSize = radius * 2;

      idRef.current += 1;
      const id = idRef.current;
      setRipples((prev) => [
        ...prev,
        { id, x: localX, y: localY, size: rippleSize },
      ]);
    },
    [],
  );

  const removeLastRipple = useCallback(() => {
    setRipples((prev) =>
      prev.length ? prev.slice(0, prev.length - 1) : prev,
    );
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (
        !disableRipple &&
        !disabled &&
        (event as { isPrimary?: boolean }).isPrimary
      ) {
        createRipple(event.clientX, event.clientY);
      }
      onPointerDown?.(event);
    },
    [disableRipple, disabled, createRipple, onPointerDown],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        removeLastRipple();
      }
      onPointerUp?.(event);
    },
    [disableRipple, removeLastRipple, onPointerUp],
  );

  const handlePointerCancel = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        removeLastRipple();
      }
      onPointerCancel?.(event);
    },
    [disableRipple, removeLastRipple, onPointerCancel],
  );

  const handlePointerLeave = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        removeLastRipple();
      }
      onPointerLeave?.(event);
    },
    [disableRipple, removeLastRipple, onPointerLeave],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        removeLastRipple();
      }
      onBlur?.(event);
    },
    [disableRipple, removeLastRipple, onBlur],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (!disableRipple && !disabled && !event.repeat) {
        if (event.key === ' ' || event.key === 'Enter') {
          const button = buttonRef.current;
          if (button) {
            const rect = button.getBoundingClientRect();
            createRipple(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
            );
          }
        }
      }
      onKeyDown?.(event);
    },
    [disableRipple, disabled, createRipple, onKeyDown],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (!disableRipple && (event.key === ' ' || event.key === 'Enter')) {
        removeLastRipple();
      }
      onKeyUp?.(event);
    },
    [disableRipple, removeLastRipple, onKeyUp],
  );

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        // eslint-disable-next-line no-param-reassign
        (ref as { current: HTMLButtonElement | null }).current = node;
      }
    },
    [ref],
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        ref={setRefs}
        type="button"
        className={cn(buttonRecipe({ variant, size }), className)}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
        {!disableRipple && (
          <span className={rippleContainer} aria-hidden>
            <AnimatePresence>
              {ripples.map((r) => (
                <m.span
                  key={r.id}
                  className={rippleStyle}
                  style={{
                    width: r.size,
                    height: r.size,
                    left: r.x - r.size / 2,
                    top: r.y - r.size / 2,
                  }}
                  initial={{ opacity: 0, transform: 'scale(0)' }}
                  animate={{
                    opacity: 0.4,
                    transform: 'scale(1)',
                    transition: { duration: 0.3 },
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </AnimatePresence>
          </span>
        )}
      </m.button>
    </LazyMotion>
  );
}

/**
 * 모든 UI가 결국 여기서 시작된다
 *
 * @remarks
 * - Ripple 효과 내장 (asChild 모드에서는 비활성화)
 * - 키보드 접근성 지원 (Enter, Space)
 * - asChild로 다른 요소를 버튼 스타일로 렌더링
 *
 * @example
 * ```tsx
 * <Button variant="default" size="md">Click me</Button>
 * <Button variant="glow" disabled>Disabled</Button>
 * <Button asChild variant="outline">
 *   <a href="/link">Link Button</a>
 * </Button>
 * ```
 */
export function Button({
  className,
  variant = 'default',
  size = 'md',
  disableRipple = false,
  asChild = false,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps): ReactElement {
  if (asChild) {
    return (
      <Slot
        ref={ref}
        className={cn(buttonRecipe({ variant, size }), className)}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        {...(props as ComponentProps<'button'>)}
      >
        {children}
      </Slot>
    );
  }

  return (
    <ButtonWithRipple
      ref={ref}
      className={className}
      variant={variant}
      size={size}
      disableRipple={disableRipple}
      disabled={disabled}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {children}
    </ButtonWithRipple>
  );
}

export default Button;
