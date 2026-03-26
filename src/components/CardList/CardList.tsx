import { Card } from '@/components/Card/Card';
import type { DrawnCard } from '@/shared/types';
import styles from './CardList.module.scss';

export type CardListProps = {
  cards: DrawnCard[];
  revealed: boolean;
};

export function CardList({ cards, revealed }: CardListProps) {
  return (
    <ul className={styles.list}>
      {cards.map((card, index) => (
        <li key={`${card.id}-${index}`} className={styles.item}>
          <Card
            name={card.name}
            imageKey={card.imageKey}
            meaning={card.activeMeaning}
            revealed={revealed}
            flipDelayMs={index * 140}
          />
        </li>
      ))}
    </ul>
  );
}
