import styles from './AppFallback.module.scss';

export function AppFallback() {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      <div className={styles.dot} />
    </div>
  );
}
