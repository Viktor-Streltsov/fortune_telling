import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale, ThemeId } from '@/shared/types';

const STORAGE_LOCALE = 'fortune-locale';
const STORAGE_THEME = 'fortune-theme';

function readLocale(): Locale {
  try {
    const v = globalThis.localStorage?.getItem(STORAGE_LOCALE);
    if (v === 'ru' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return 'en';
}

function readTheme(): ThemeId {
  try {
    const v = globalThis.localStorage?.getItem(STORAGE_THEME);
    if (v === 'witch' || v === 'light' || v === 'dark') return v;
  } catch {
    /* ignore */
  }
  return 'witch';
}

type SettingsContextValue = {
  locale: Locale;
  theme: ThemeId;
  setLocale: (l: Locale) => void;
  setTheme: (t: ThemeId) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);
  const [theme, setThemeState] = useState<ThemeId>(readTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.lang = locale === 'ru' ? 'ru' : 'en';
  }, [theme, locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      globalThis.localStorage?.setItem(STORAGE_LOCALE, l);
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    try {
      globalThis.localStorage?.setItem(STORAGE_THEME, t);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({ locale, theme, setLocale, setTheme }),
    [locale, theme, setLocale, setTheme]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
