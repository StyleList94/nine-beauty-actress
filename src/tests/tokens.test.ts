import {
  palette,
  font,
  typography,
  spacing,
  radius,
  shadows,
  motion,
} from 'lib/core/tokens';

describe('palette', () => {
  const colorScales = [
    'neutral',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
  ] as const;

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

  it.each(colorScales)('should have %s color scale', (scale) => {
    expect(palette[scale]).toBeDefined();
  });

  it.each(colorScales)('should have 11 steps for %s', (scale) => {
    steps.forEach((step) => {
      expect(palette[scale][step]).toBeDefined();
    });
  });

  it('should use OKLCH color format', () => {
    expect(palette.neutral[50]).toMatch(/^oklch\(/);
    expect(palette.orange[400]).toMatch(/^oklch\(/);
    expect(palette.blue[500]).toMatch(/^oklch\(/);
  });

  it('should have brand base color at orange[400]', () => {
    expect(palette.orange[400]).toBe('oklch(81% 0.15 40)');
  });

  it('should have primary base color at purple[500]', () => {
    expect(palette.purple[500]).toBe('oklch(60% 0.25 280)');
  });

  it('should have alpha variants', () => {
    expect(palette.neutral['100/80']).toBe('oklch(96% 0 0 / 0.8)');
    expect(palette.green['500/50']).toBe('oklch(62% 0.18 145 / 0.5)');
    expect(palette.red['500/50']).toBe('oklch(60% 0.2 25 / 0.5)');
  });
});

describe('font (primitives)', () => {
  it('should have font families', () => {
    expect(font.family.sans).toContain('Pretendard');
    expect(font.family.mono).toContain('Roboto Mono');
  });

  it('should have font sizes in rem', () => {
    expect(font.size.base).toBe('1rem');
    expect(font.size.sm).toBe('0.875rem');
    expect(font.size.xs).toBe('0.75rem');
  });

  it('should have font weights', () => {
    expect(font.weight.normal).toBe('400');
    expect(font.weight.bold).toBe('700');
  });

  it('should have line heights', () => {
    expect(font.lineHeight.normal).toBe('1.5');
    expect(font.lineHeight.tight).toBe('1.25');
  });

  it('should have letter spacing', () => {
    expect(font.letterSpacing.normal).toBe('0');
    expect(font.letterSpacing.tight).toBe('-0.025em');
  });
});

describe('typography (compositions)', () => {
  it('should have heading styles', () => {
    expect(typography.heading['2xl']).toBeDefined();
    expect(typography.heading.xl).toBeDefined();
    expect(typography.heading.lg).toBeDefined();
  });

  it('should have body styles', () => {
    expect(typography.body.lg).toBeDefined();
    expect(typography.body.md).toBeDefined();
    expect(typography.body.sm).toBeDefined();
  });

  it('should have label styles', () => {
    expect(typography.label.lg).toBeDefined();
    expect(typography.label.md).toBeDefined();
    expect(typography.label.sm).toBeDefined();
  });

  it('should compose font primitives', () => {
    expect(typography.heading.xl.fontSize).toBe(font.size['2xl']);
    expect(typography.heading.xl.fontWeight).toBe(font.weight.bold);
    expect(typography.body.md.lineHeight).toBe(font.lineHeight.normal);
  });
});

describe('spacing', () => {
  it('should have px-based keys', () => {
    expect(spacing[0]).toBe('0');
    expect(spacing[16]).toBe('1rem');
    expect(spacing[32]).toBe('2rem');
  });

  it('should have small values', () => {
    expect(spacing[2]).toBe('0.125rem');
    expect(spacing[4]).toBe('0.25rem');
    expect(spacing[6]).toBe('0.375rem');
    expect(spacing[8]).toBe('0.5rem');
  });

  it('should have large values', () => {
    expect(spacing[48]).toBe('3rem');
    expect(spacing[64]).toBe('4rem');
    expect(spacing[96]).toBe('6rem');
  });

  it('should have spacing 36', () => {
    expect(spacing[36]).toBe('2.25rem');
  });
});

describe('radius', () => {
  it('should have standard radius values', () => {
    expect(radius.none).toBe('0');
    expect(radius.sm).toBe('0.125rem');
    expect(radius.md).toBe('0.375rem');
    expect(radius.lg).toBe('0.5rem');
    expect(radius.full).toBe('9999px');
  });

  it('should have default radius', () => {
    expect(radius.default).toBe('0.25rem');
  });
});

describe('shadows', () => {
  it('should have shadow scale', () => {
    expect(shadows.none).toBe('none');
    expect(shadows.sm).toBeDefined();
    expect(shadows.default).toBeDefined();
    expect(shadows.md).toBeDefined();
    expect(shadows.lg).toBeDefined();
    expect(shadows.xl).toBeDefined();
  });

  it('should use OKLCH for shadow colors', () => {
    expect(shadows.sm).toContain('oklch');
    expect(shadows.md).toContain('oklch');
  });

  it('should have inner shadow', () => {
    expect(shadows.inner).toContain('inset');
  });
});

describe('motion', () => {
  it('should have duration values', () => {
    expect(motion.duration.instant).toBe('0ms');
    expect(motion.duration.fast).toBe('100ms');
    expect(motion.duration.normal).toBe('200ms');
    expect(motion.duration.slow).toBe('300ms');
    expect(motion.duration.slower).toBe('500ms');
  });

  it('should have easing values', () => {
    expect(motion.easing.linear).toBe('linear');
    expect(motion.easing.ease).toBe('ease');
    expect(motion.easing.easeIn).toContain('cubic-bezier');
    expect(motion.easing.easeOut).toContain('cubic-bezier');
    expect(motion.easing.spring).toContain('cubic-bezier');
  });
});
