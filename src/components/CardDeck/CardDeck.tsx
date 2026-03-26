import styles from './CardDeck.module.scss';

export type CardDeckProps = {
  /** Number of face-down cards to hint at the draw size */
  stackSize: 1 | 2 | 3;
  onDraw: () => void;
  drawLabel: string;
};

export function CardDeck({ stackSize, onDraw, drawLabel }: CardDeckProps) {
  const n = Math.min(stackSize, 3);
  return (
    <div className={styles.wrap}>
      <div className={styles.stack} aria-hidden>
        {Array.from({ length: n }).map((_, i) => (
          <div
            key={i}
            className={styles.stackCard}
            style={{
              transform: `translateY(${-i * 6}px) rotate(${i * 1.2}deg)`,
            }}
          />
        ))}
      </div>
      <button type="button" className={styles.drawBtn} onClick={onDraw}>
        {drawLabel}
      </button>
    </div>
  );
}
