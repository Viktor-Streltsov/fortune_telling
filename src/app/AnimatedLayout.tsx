import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useSettings } from '@/shared/contexts/SettingsContext';
import styles from './AnimatedLayout.module.scss';

/**
 * Locale + route cross-fade to avoid harsh swaps when language changes.
 */
export function AnimatedLayout() {
  const { locale } = useSettings();
  const location = useLocation();
  const reduce = useReducedMotion();
  const key = `${location.pathname}-${locale}`;

  return (
    <motion.div
      key={key}
      className={styles.outlet}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <Outlet />
    </motion.div>
  );
}
