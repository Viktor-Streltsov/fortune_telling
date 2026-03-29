import { useEffect, useState } from 'react';
import { getCardImageSrc } from '@/shared/lib/cardImages';
import styles from './Card.module.scss';

export type CardProps = {
  name: string;
  imageKey: string;
  meaning?: string;
  /** When true, card animates from back to front */
  revealed: boolean;
  /** Stagger flip for multiple cards */
  flipDelayMs?: number;
  className?: string;
};

export function Card({ name, imageKey, meaning, revealed, flipDelayMs = 0, className }: CardProps) {
  const [showFront, setShowFront] = useState(false);
  const src = getCardImageSrc(imageKey);

  useEffect(() => {
    if (!revealed) {
      setShowFront(false);
      return;
    }
    const id = globalThis.setTimeout(() => setShowFront(true), flipDelayMs);
    return () => globalThis.clearTimeout(id);
  }, [revealed, flipDelayMs]);

  return (
    <div
      className={className ? `${styles.root} ${className}` : styles.root}
      data-testid="fortune-card"
    >
      <div
        className={`${styles.flipInner} ${showFront ? styles.flipInnerVisible : ''}`}
        aria-hidden={!showFront}
      >
        <div className={styles.faceBack}>
          <div className={styles.backPattern} />
          <span className={styles.backGlyph}>✦</span>
        </div>
        <div className={styles.faceFront}>
          {src ? (
            <img
              className={styles.cardArt}
              src={src}
              alt=""
              width={440}
              height={704}
              decoding="async"
              loading="lazy"
            />
          ) : (
            <div className={styles.artFallback} aria-hidden />
          )}
          <div className={styles.frontInner}>
            <p className={styles.cardName}>{name}</p>
            {meaning ? <p className={styles.cardMeaning}>{meaning}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
