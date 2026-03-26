/**
 * Pure random utilities — easy to unit test and swap for seeded RNG in tests.
 */

export function randomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0;
  const max = Math.floor(maxExclusive);
  return Math.floor(Math.random() * max);
}

export function shuffleInPlace<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickUnique<T>(items: T[], count: number): T[] {
  if (count <= 0) return [];
  if (count >= items.length) return shuffleInPlace(items);
  return shuffleInPlace(items).slice(0, count);
}
