import styles from './ResultScreen.module.scss';

export type ResultScreenProps = {
  title: string;
  text: string;
  onDrawAgain: () => void;
  onNewCategory: () => void;
  drawAgainLabel: string;
  chooseCategoryLabel: string;
};

export function ResultScreen({
  title,
  text,
  onDrawAgain,
  onNewCategory,
  drawAgainLabel,
  chooseCategoryLabel,
}: ResultScreenProps) {
  return (
    <section className={styles.root} aria-labelledby="result-heading">
      <h2 id="result-heading" className={styles.title}>
        {title}
      </h2>
      <pre className={styles.body}>{text}</pre>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={onDrawAgain}>
          {drawAgainLabel}
        </button>
        <button type="button" className={styles.secondary} onClick={onNewCategory}>
          {chooseCategoryLabel}
        </button>
      </div>
    </section>
  );
}
