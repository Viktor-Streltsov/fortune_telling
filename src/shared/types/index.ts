export type CategoryId = 'love' | 'daily' | 'career' | 'money';

export type Locale = 'en' | 'ru';

export type ThemeId = 'witch' | 'light' | 'dark';

export type LocalizedText = Record<Locale, string>;

export type CardMeanings = Record<CategoryId, LocalizedText>;

export type FortuneCard = {
  id: string;
  names: LocalizedText;
  imageKey: string;
  meanings: CardMeanings;
};

export type DrawnCard = Omit<FortuneCard, 'names'> & {
  name: string;
  activeMeaning: string;
};
