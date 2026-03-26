import type { CategoryId, DrawnCard, Locale } from '@/shared/types';

const OPENERS: Record<Locale, Record<CategoryId, string>> = {
  en: {
    love: 'The cards speak to the emotional tone ahead.',
    daily: 'The day’s energy gathers around these themes.',
    career: 'Your path at work and craft highlights the following.',
    money: 'Material flow and priorities come into focus.',
  },
  ru: {
    love: 'Карты говорят о настроении чувств впереди.',
    daily: 'Энергия дня сосредоточена на этих темах.',
    career: 'В работе и ремесле всплывают следующие моменты.',
    money: 'В фокусе — материальные потоки и приоритеты.',
  },
};

const CONNECTORS_EN = [
  'Together, they suggest',
  'Taken as one story,',
  'The thread connecting them is',
];

const CONNECTORS_RU = ['Вместе они намекают на', 'Как одна история:', 'Нить между ними —'];

function pickConnector(locale: Locale, index: number): string {
  const list = locale === 'ru' ? CONNECTORS_RU : CONNECTORS_EN;
  return list[index % list.length];
}

/**
 * Builds a readable combined reading from 1–3 cards for the active category.
 */
export function buildInterpretation(
  locale: Locale,
  category: CategoryId,
  cards: DrawnCard[]
): string {
  if (cards.length === 0) return '';

  const opener = OPENERS[locale][category];
  const names = cards.map((c) => c.name);

  if (cards.length === 1) {
    if (locale === 'ru') {
      return `${opener} Карта «${cards[0].name}» указывает на: ${cards[0].activeMeaning}`;
    }
    return `${opener} ${cards[0].name} points to: ${cards[0].activeMeaning}`;
  }

  const parts =
    locale === 'ru'
      ? cards.map((c, i) => `${i + 1}) «${c.name}»: ${c.activeMeaning}`)
      : cards.map((c, i) => `${i + 1}) ${c.name}: ${c.activeMeaning}`);

  const bridge =
    cards.length === 2
      ? locale === 'ru'
        ? `${pickConnector(locale, 0)} сдвиг между «${names[0]}» и «${names[1]}» — сначала складывается ситуация, затем она преображается.`
        : `${pickConnector(locale, 0)} a shift between “${names[0]}” and “${names[1]}”—first the situation forms, then it transforms.`
      : locale === 'ru'
        ? `${pickConnector(locale, 1)} трёхчастная арка: начало («${names[0]}»), напряжение или урок («${names[1]}»), и развязка («${names[2]}»).`
        : `${pickConnector(locale, 1)} a three-part arc: beginning (${names[0]}), tension or lesson (${names[1]}), and resolution (${names[2]}).`;

  return [opener, '', ...parts, '', bridge].join('\n');
}
