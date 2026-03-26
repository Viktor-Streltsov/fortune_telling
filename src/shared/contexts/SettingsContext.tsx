import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { STORAGE_KEYS } from '@/shared/lib/storageKeys';
import type { Locale, ThemeId } from '@/shared/types';

function readLocale(): Locale {
  try {
    const v = globalThis.localStorage?.getItem(STORAGE_KEYS.locale);
    if (v === 'ru' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return 'en';
}

function readTheme(): ThemeId {
  try {
    const v = globalThis.localStorage?.getItem(STORAGE_KEYS.theme);
    if (v === 'witch' || v === 'light' || v === 'dark') return v;
  } catch {
    /* ignore */
  }
  return 'witch';
}

function readSoundEnabled(): boolean {
  try {
    const v = globalThis.localStorage?.getItem(STORAGE_KEYS.sound);
    if (v === '0') return false;
    if (v === '1') return true;
  } catch {
    /* ignore */
  }
  return true;
}

type SettingsContextValue = {
  locale: Locale;
  theme: ThemeId;
  soundEnabled: boolean;
  setLocale: (l: Locale) => void;
  setTheme: (t: ThemeId) => void;
  setSoundEnabled: (on: boolean) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);
  const [theme, setThemeState] = useState<ThemeId>(readTheme);
  const [soundEnabled, setSoundEnabledState] = useState(readSoundEnabled);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.lang = locale === 'ru' ? 'ru' : 'en';
  }, [theme, locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      globalThis.localStorage?.setItem(STORAGE_KEYS.locale, l);
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    try {
      globalThis.localStorage?.setItem(STORAGE_KEYS.theme, t);
    } catch {
      /* ignore */
    }
  }, []);

  const setSoundEnabled = useCallback((on: boolean) => {
    setSoundEnabledState(on);
    try {
      globalThis.localStorage?.setItem(STORAGE_KEYS.sound, on ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      locale,
      theme,
      soundEnabled,
      setLocale,
      setTheme,
      setSoundEnabled,
    }),
    [locale, theme, soundEnabled, setLocale, setTheme, setSoundEnabled]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
