import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Card } from '@/components/Card/Card';
import type { DrawnCard } from '@/shared/types';
import styles from './CardList.module.scss';

export type CardListProps = {
  cards: DrawnCard[];
  revealed: boolean;
};

export function CardList({ cards, revealed }: CardListProps) {
  const reduce = useReducedMotion();

  const { container, item } = useMemo(() => {
    const container: Variants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: reduce
          ? { duration: 0 } : { staggerChildren: 0.14, delayChildren: 0.08 },
      },
    };

    const item: Variants = {
      hidden: { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: reduce
          ? { duration: 0.15 }
          : { type: 'spring' as const, stiffness: 380, damping: 28 },
      },
    };

    return { container, item };
  }, [reduce]);

  return (
    <motion.ul
      className={styles.list}
      variants={container}
      initial="hidden"
      animate={revealed ? 'show' : 'hidden'}
    >
      {cards.map((card, index) => (
        <motion.li key={`${card.id}-${index}`} className={styles.item} variants={item}>
          <Card
            name={card.name}
            imageKey={card.imageKey}
            meaning={card.activeMeaning}
            revealed={revealed}
            flipDelayMs={index * 175}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
