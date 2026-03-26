import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardDeck } from '@/components/CardDeck/CardDeck';
import { CardList } from '@/components/CardList/CardList';
import { ResultScreen } from '@/components/ResultScreen/ResultScreen';
import { useFortune } from '@/features/fortune-reading/FortuneContext';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { useDrawSound } from '@/shared/hooks/useDrawSound';
import { t } from '@/shared/i18n/messages';
import styles from './ReadingPage.module.scss';

export function ReadingPage() {
  const navigate = useNavigate();
  const { locale } = useSettings();
  const m = t(locale);
  const { play } = useDrawSound();
  const fortune = useFortune();
  const {
    category,
    cardCount,
    setCardCount,
    phase,
    drawn,
    interpretation,
    drawCards,
    resetReading,
    clearCategory,
  } = fortune;

  useEffect(() => {
    if (!category) navigate('/home', { replace: true });
  }, [category, navigate]);

  if (!category) return null;

  const topicLabel =
    category === 'love'
      ? m.catLove
      : category === 'daily'
        ? m.catDaily
        : category === 'career'
          ? m.catCareer
          : m.catMoney;

  const showResult = phase === 'revealed' && drawn.length > 0;

  const handleDraw = () => {
    play();
    drawCards();
  };

  const handleDrawAgain = () => {
    resetReading();
  };

  const handleNewCategory = () => {
    clearCategory();
    navigate('/home');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.back} onClick={() => navigate('/home')}>
          ← {m.readingBack}
        </button>
        <div>
          <h1 className={styles.title}>{m.readingTitle(topicLabel)}</h1>
          <p className={styles.subtitle}>{m.readingSubtitle}</p>
        </div>
      </header>

      <section className={styles.countSection} aria-label={m.cardsLabel}>
        <span className={styles.countLabel}>{m.cardsLabel}</span>
        <div className={styles.countRow}>
          {([1, 2, 3] as const).map((n) => (
            <button
              key={n}
              type="button"
              className={`${styles.countBtn} ${cardCount === n ? styles.countBtnActive : ''}`}
              onClick={() => setCardCount(n)}
              disabled={phase !== 'idle'}
              aria-pressed={cardCount === n}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      {phase === 'drawing' ? (
        <div className={styles.loading} role="status" aria-live="polite">
          <div className={styles.spinner} aria-hidden />
          <p className={styles.loadingText}>{m.loadingShuffle}</p>
        </div>
      ) : !showResult ? (
        <CardDeck stackSize={cardCount} onDraw={handleDraw} drawLabel={m.drawCards} />
      ) : (
        <>
          <CardList cards={drawn} revealed />
          <ResultScreen
            title={m.resultTitle}
            text={interpretation}
            onDrawAgain={handleDrawAgain}
            onNewCategory={handleNewCategory}
            drawAgainLabel={m.drawAgain}
            chooseCategoryLabel={m.chooseCategory}
          />
        </>
      )}
    </div>
  );
}
