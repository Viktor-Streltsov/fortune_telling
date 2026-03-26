import { useSettings } from '@/shared/contexts/SettingsContext';
import styles from './WitchBackground.module.scss';

/** Subtle animated mist for the mystical (witch) theme only */
export function WitchBackground() {
  const { theme } = useSettings();
  if (theme !== 'witch') return null;

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.layerA} />
      <div className={styles.layerB} />
      <div className={styles.spark} />
    </div>
  );
}
