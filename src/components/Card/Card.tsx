import { useEffect, useState } from 'react';
import styles from './Card.module.scss';

export type CardProps = {
  name: string;
  imageKey: string;
  meaning?: string;
  /** When true, card animates from back to front */
  revealed: boolean;
  /** Stagger flip for multiple cards */
  flipDelayMs?: number;
};

export function Card({ name, imageKey, meaning, revealed, flipDelayMs = 0 }: CardProps) {
  const [showFront, setShowFront] = useState(false);

  useEffect(() => {
    if (!revealed) {
      setShowFront(false);
      return;
    }
    const id = globalThis.setTimeout(() => setShowFront(true), flipDelayMs);
    return () => globalThis.clearTimeout(id);
  }, [revealed, flipDelayMs]);

  const artClass = styles[`art_${imageKey}`] ?? styles.art_fallback;

  return (
    <div className={styles.root} data-testid="fortune-card">
      <div
        className={`${styles.flipInner} ${showFront ? styles.flipInnerVisible : ''}`}
        aria-hidden={!showFront}
      >
        <div className={styles.faceBack}>
          <div className={styles.backPattern} />
          <span className={styles.backGlyph}>✦</span>
        </div>
        <div className={`${styles.faceFront} ${artClass}`}>
          <div className={styles.frontInner}>
            <p className={styles.cardName}>{name}</p>
            {meaning ? <p className={styles.cardMeaning}>{meaning}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
