import styles from './ShuffleDeck.module.scss';

export type ShuffleDeckProps = {
  /** When false, animations are disabled for reduced motion */
  animate: boolean;
};

/**
 * Decorative deck stack with a looping shuffle motion for the “shuffling” step.
 */
export function ShuffleDeck({ animate }: ShuffleDeckProps) {
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={`${styles.deck} ${animate ? styles.deckAnimated : ''}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={styles.card}
            style={{
              zIndex: i,
              transform: `translateY(${-i * 5}px) rotate(${(i - 2) * 2.5}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
