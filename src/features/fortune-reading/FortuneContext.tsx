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
import type { CategoryId } from '@/shared/types';

type FortuneContextValue = FortuneState & {
  setCategory: (c: CategoryId) => void;
  setCardCount: (n: 1 | 2 | 3) => void;
  /** Draws random cards for the current `cardCount` and reveals the reading (no extra delay). */
  revealRandomDraw: () => void;
  resetReading: () => void;
  clearCategory: () => void;
};

const FortuneContext = createContext<FortuneContextValue | null>(null);

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

  const revealRandomDraw = useCallback(() => {
    if (!state.category || state.phase !== 'idle') return;
    const count = state.cardCount;
    const cards = drawRandomCards(count);
    drawGen.current += 1;
    dispatch({ type: 'DRAW_COMPLETE', payload: { cards, locale } });
  }, [state.category, state.phase, state.cardCount, locale]);

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
      revealRandomDraw,
      resetReading,
      clearCategory,
    }),
    [state, setCategory, setCardCount, revealRandomDraw, resetReading, clearCategory]
  );

  return <FortuneContext.Provider value={value}>{children}</FortuneContext.Provider>;
}

export function useFortune(): FortuneContextValue {
  const ctx = useContext(FortuneContext);
  if (!ctx) throw new Error('useFortune must be used within FortuneProvider');
  return ctx;
}
