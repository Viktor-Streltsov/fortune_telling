import { useSettings } from '@/shared/contexts/SettingsContext';
import { t } from '@/shared/i18n/messages';
import type { ThemeId } from '@/shared/types';
import styles from './AppControls.module.scss';

const THEMES: ThemeId[] = ['witch', 'light', 'dark'];

export function AppControls() {
  const { locale, theme, setLocale, setTheme } = useSettings();
  const m = t(locale);

  return (
    <div className={styles.bar} role="toolbar" aria-label={m.controlsBar}>
      <div className={styles.group}>
        <span className={styles.label}>{m.controlsLanguage}</span>
        <div className={styles.segment} role="group">
          {(['en', 'ru'] as const).map((l) => (
            <button
              key={l}
              type="button"
              className={`${styles.segBtn} ${locale === l ? styles.segBtnActive : ''}`}
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.group}>
        <span className={styles.label}>{m.controlsTheme}</span>
        <div className={styles.segment} role="group">
          {THEMES.map((th) => (
            <button
              key={th}
              type="button"
              className={`${styles.segBtn} ${theme === th ? styles.segBtnActive : ''}`}
              onClick={() => setTheme(th)}
              aria-pressed={theme === th}
              title={th === 'witch' ? m.themeWitch : th === 'light' ? m.themeLight : m.themeDark}
            >
              {th === 'witch' ? m.themeWitch : th === 'light' ? m.themeLight : m.themeDark}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
