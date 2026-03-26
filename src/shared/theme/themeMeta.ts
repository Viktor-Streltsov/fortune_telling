import type { ThemeId } from '@/shared/types';

/**
 * Theme metadata (logic / UI labels). Visual tokens live in `styles/_themes.scss` as CSS variables.
 */
export const THEME_ORDER: readonly ThemeId[] = ['witch', 'light', 'dark'];

export const THEME_META: Record<
  ThemeId,
  { id: ThemeId; accent: 'mystical' | 'soft' | 'minimal' }
> = {
  witch: { id: 'witch', accent: 'mystical' },
  light: { id: 'light', accent: 'soft' },
  dark: { id: 'dark', accent: 'minimal' },
};
