import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { t } from '@/shared/i18n/messages';
import styles from './IntroPage.module.scss';

export function IntroPage() {
  const navigate = useNavigate();
  const { locale } = useSettings();
  const m = t(locale);

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden />
      <header className={styles.header}>
        <p className={styles.kicker}>{m.introKicker}</p>
        <h1 className={styles.title}>{m.introTitle}</h1>
        <p className={styles.lead}>{m.introLead}</p>
      </header>
      <button type="button" className={styles.cta} onClick={() => navigate('/home')}>
        {m.introCta}
      </button>
      <p className={styles.note}>{m.introNote}</p>
    </div>
  );
}
