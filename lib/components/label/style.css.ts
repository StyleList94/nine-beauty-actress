import { style } from '@vanilla-extract/css';

import { font, spacing } from 'lib/core/styles/tokens';

export const labelBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.none,
  fontWeight: font.weight.medium,
  userSelect: 'none',
  selectors: {
    ':is([data-disabled="true"]) &': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
});
