import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { t } from '@/shared/i18n/messages';
import styles from './IntroPage.module.scss';

export function IntroPage() {
  const navigate = useNavigate();
  const { locale } = useSettings();
  const m = t(locale);

  const handleEnter = () => {
    navigate('/home', { replace: true });
  };

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.glow} aria-hidden />
      <header className={styles.header}>
        <p className={styles.kicker}>{m.introKicker}</p>
        <h1 className={styles.title}>{m.introTitle}</h1>
        <p className={styles.lead}>{m.introLead}</p>
      </header>
      <button type="button" className={`${styles.cta} pressable`} onClick={handleEnter}>
        {m.introCta}
      </button>
      <p className={styles.note}>{m.introNote}</p>
    </motion.div>
  );
}
