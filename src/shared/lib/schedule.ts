/**
 * Wraps global scheduling so the app can swap implementations in tests or native shells.
 */
export function scheduleTimeout(callback: () => void, ms: number): number {
  return globalThis.setTimeout(callback, ms);
}
