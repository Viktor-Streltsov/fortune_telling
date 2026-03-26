import { useSettings } from '@/shared/contexts/SettingsContext';
import { t } from '@/shared/i18n/messages';
import type { CategoryId } from '@/shared/types';
import styles from './CategorySelector.module.scss';

export type CategorySelectorProps = {
  value: CategoryId | null;
  onChange: (id: CategoryId) => void;
};

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const { locale } = useSettings();
  const m = t(locale);
  const items = [
    { id: 'love' as const, label: m.catLove, blurb: m.catLoveBlurb },
    { id: 'daily' as const, label: m.catDaily, blurb: m.catDailyBlurb },
    { id: 'career' as const, label: m.catCareer, blurb: m.catCareerBlurb },
    { id: 'money' as const, label: m.catMoney, blurb: m.catMoneyBlurb },
  ];

  return (
    <div className={styles.root} role="group" aria-label={m.homeTitle}>
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.card} ${active ? styles.cardActive : ''}`}
            onClick={() => onChange(item.id)}
            aria-pressed={active}
          >
            <span className={styles.label}>{item.label}</span>
            <span className={styles.blurb}>{item.blurb}</span>
          </button>
        );
      })}
    </div>
  );
}
