import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { t } from '@/shared/i18n/messages';
import styles from './SplashScreen.module.scss';

/** ~2.8s — immersive intro; tap skips */
const AUTO_MS = 2800;

export function SplashScreen() {
  const navigate = useNavigate();
  const { locale } = useSettings();
  const m = t(locale);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    navigate('/intro', { replace: true });
  }, [navigate]);

  useEffect(() => {
    timerRef.current = setTimeout(finish, AUTO_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [finish]);

  return (
    <motion.div
      className={styles.root}
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      onPointerDown={finish}
    >
      <div className={styles.mist} aria-hidden />
      <div className={styles.particles} aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={styles.particle} />
        ))}
      </div>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className={styles.title}>{m.appTitle}</h1>
        <p className={styles.subtitle}>{m.splashTitle}</p>
        <p className={styles.hint}>{m.splashTap}</p>
      </motion.div>
      <motion.div
        className={styles.glowOrb}
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
