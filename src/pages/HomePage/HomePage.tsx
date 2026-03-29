import { useNavigate } from 'react-router-dom';
import { CategorySelector } from '@/components/CategorySelector/CategorySelector';
import { useFortune } from '@/features/fortune-reading/FortuneContext';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { t } from '@/shared/i18n/messages';
import type { CategoryId } from '@/shared/types';
import styles from './HomePage.module.scss';

export function HomePage() {
  const navigate = useNavigate();
  const { locale } = useSettings();
  const m = t(locale);
  const { category, setCategory } = useFortune();

  const handleSelectSpread = (id: CategoryId) => {
    setCategory(id);
    navigate('/reading');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{m.homeTitle}</h1>
        <p className={styles.subtitle}>{m.homeSubtitle}</p>
      </header>
      <CategorySelector value={category} onSelect={handleSelectSpread} />
    </div>
  );
}
