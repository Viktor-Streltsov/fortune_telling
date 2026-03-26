import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';
import {
  drawRandomCards,
  fortuneReducer,
  initialFortuneState,
  type FortuneState,
} from '@/features/fortune-reading/fortuneReducer';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { scheduleTimeout } from '@/shared/lib/schedule';
import type { CategoryId } from '@/shared/types';

type FortuneContextValue = FortuneState & {
  setCategory: (c: CategoryId) => void;
  setCardCount: (n: 1 | 2 | 3) => void;
  drawCards: () => void;
  resetReading: () => void;
  clearCategory: () => void;
};

const FortuneContext = createContext<FortuneContextValue | null>(null);

const DRAW_DELAY_MS = 900;

export function FortuneProvider({ children }: { children: ReactNode }) {
  const { locale } = useSettings();
  const prevLocale = useRef(locale);
  const drawGen = useRef(0);
  const [state, dispatch] = useReducer(fortuneReducer, initialFortuneState);

  useEffect(() => {
    if (prevLocale.current !== locale) {
      drawGen.current += 1;
      dispatch({ type: 'RESET_READING' });
      prevLocale.current = locale;
    }
  }, [locale]);

  const setCategory = useCallback((c: CategoryId) => {
    dispatch({ type: 'SET_CATEGORY', payload: c });
  }, []);

  const setCardCount = useCallback((n: 1 | 2 | 3) => {
    dispatch({ type: 'SET_CARD_COUNT', payload: n });
  }, []);

  const drawCards = useCallback(() => {
    if (!state.category) return;
    const gen = ++drawGen.current;
    dispatch({ type: 'DRAW_START' });
    const count = state.cardCount;
    scheduleTimeout(() => {
      if (gen !== drawGen.current) return;
      const cards = drawRandomCards(count);
      dispatch({ type: 'DRAW_COMPLETE', payload: { cards, locale } });
    }, DRAW_DELAY_MS);
  }, [state.category, state.cardCount, locale]);

  const resetReading = useCallback(() => {
    dispatch({ type: 'RESET_READING' });
  }, []);

  const clearCategory = useCallback(() => {
    dispatch({ type: 'CLEAR_CATEGORY' });
  }, []);

  const value = useMemo<FortuneContextValue>(
    () => ({
      ...state,
      setCategory,
      setCardCount,
      drawCards,
      resetReading,
      clearCategory,
    }),
    [state, setCategory, setCardCount, drawCards, resetReading, clearCategory]
  );

  return <FortuneContext.Provider value={value}>{children}</FortuneContext.Provider>;
}

export function useFortune(): FortuneContextValue {
  const ctx = useContext(FortuneContext);
  if (!ctx) throw new Error('useFortune must be used within FortuneProvider');
  return ctx;
}
