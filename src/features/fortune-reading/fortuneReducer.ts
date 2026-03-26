import { CARDS } from '@/data/cards';
import { buildInterpretation } from '@/shared/lib/interpretation';
import { pickUnique } from '@/shared/lib/random';
import type { CategoryId, DrawnCard, FortuneCard, Locale } from '@/shared/types';

export type FortunePhase = 'idle' | 'drawing' | 'revealed';

export type FortuneState = {
  category: CategoryId | null;
  cardCount: 1 | 2 | 3;
  phase: FortunePhase;
  drawn: DrawnCard[];
  interpretation: string;
};

export type FortuneAction =
  | { type: 'SET_CATEGORY'; payload: CategoryId }
  | { type: 'SET_CARD_COUNT'; payload: 1 | 2 | 3 }
  | { type: 'DRAW_START' }
  | { type: 'DRAW_COMPLETE'; payload: { cards: FortuneCard[]; locale: Locale } }
  | { type: 'RESET_READING' }
  | { type: 'CLEAR_CATEGORY' };

function toDrawn(card: FortuneCard, category: CategoryId, locale: Locale): DrawnCard {
  return {
    id: card.id,
    imageKey: card.imageKey,
    meanings: card.meanings,
    name: card.names[locale],
    activeMeaning: card.meanings[category][locale],
  };
}

export function fortuneReducer(state: FortuneState, action: FortuneAction): FortuneState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, drawn: [], interpretation: '', phase: 'idle' };
    case 'SET_CARD_COUNT':
      return { ...state, cardCount: action.payload, drawn: [], interpretation: '', phase: 'idle' };
    case 'DRAW_START':
      return { ...state, phase: 'drawing', drawn: [], interpretation: '' };
    case 'DRAW_COMPLETE': {
      const category = state.category;
      if (!category) return state;
      const { cards, locale } = action.payload;
      const drawn = cards.map((c) => toDrawn(c, category, locale));
      const interpretation = buildInterpretation(locale, category, drawn);
      return { ...state, phase: 'revealed', drawn, interpretation };
    }
    case 'RESET_READING':
      return {
        ...state,
        phase: 'idle',
        drawn: [],
        interpretation: '',
      };
    case 'CLEAR_CATEGORY':
      return {
        category: null,
        cardCount: state.cardCount,
        phase: 'idle',
        drawn: [],
        interpretation: '',
      };
    default:
      return state;
  }
}

export const initialFortuneState: FortuneState = {
  category: null,
  cardCount: 1,
  phase: 'idle',
  drawn: [],
  interpretation: '',
};

export function drawRandomCards(count: 1 | 2 | 3): FortuneCard[] {
  return pickUnique(CARDS, count);
}
