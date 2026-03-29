/**
 * Resolves `FortuneCard.imageKey` to bundled URLs under `src/data/img/`.
 * Supports `star.png`, `TheStar.webp`, `WheelofFortune.webp`, etc.
 */

const modules = import.meta.glob('../../data/img/*.{png,webp,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function basename(path: string): string {
  const seg = path.split('/').pop() ?? path;
  return seg.replace(/\.[^.]+$/, '');
}

/** Maps a filename stem to the canonical `imageKey` used in card data. */
function fileStemToImageKey(stem: string): string {
  const lower = stem.toLowerCase().replace(/\s+/g, '');
  if (lower === 'wheeloffortune') return 'wheel';
  if (lower.startsWith('the')) return lower.slice(3);
  return lower;
}

function pathPriority(path: string): number {
  const ext = (path.split('.').pop() ?? '').toLowerCase();
  const base = basename(path);
  let score = 0;
  if (ext === 'png') score += 20;
  else if (ext === 'webp') score += 10;
  else if (ext === 'jpg' || ext === 'jpeg') score += 8;
  if (!/^The/i.test(base)) score += 5;
  return score;
}

const bestUrlByKey = new Map<string, { url: string; score: number }>();

for (const [path, url] of Object.entries(modules)) {
  const key = fileStemToImageKey(basename(path));
  const score = pathPriority(path);
  const cur = bestUrlByKey.get(key);
  if (!cur || score > cur.score) {
    bestUrlByKey.set(key, { url, score });
  }
}

export function getCardImageSrc(imageKey: string): string | undefined {
  return bestUrlByKey.get(imageKey)?.url;
}
