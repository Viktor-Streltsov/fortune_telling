import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CardList } from '@/components/CardList/CardList';
import { ResultScreen } from '@/components/ResultScreen/ResultScreen';
import { ShuffleDeck } from '@/components/ShuffleDeck/ShuffleDeck';
import { useFortune } from '@/features/fortune-reading/FortuneContext';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { useDrawSound } from '@/shared/hooks/useDrawSound';
import { hapticLight } from '@/shared/native/haptics';
import { t } from '@/shared/i18n/messages';
import styles from './ReadingPage.module.scss';

const SHUFFLE_MS = 1600;

type FlowStep = 'chooseCount' | 'shuffling';

export function ReadingPage() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { locale } = useSettings();
  const m = t(locale);
  const { play } = useDrawSound();
  const fortune = useFortune();
  const {
    category,
    phase,
    drawn,
    interpretation,
    setCardCount,
    revealRandomDraw,
    resetReading,
    clearCategory,
  } = fortune;

  const [flowStep, setFlowStep] = useState<FlowStep>('chooseCount');

  useEffect(() => {
    if (!category) navigate('/home', { replace: true });
  }, [category, navigate]);

  useEffect(() => {
    if (flowStep !== 'shuffling') return;
    const id = globalThis.setTimeout(() => {
      revealRandomDraw();
    }, SHUFFLE_MS);
    return () => globalThis.clearTimeout(id);
  }, [flowStep, revealRandomDraw]);

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

  const handleCount = useCallback(
    (n: 1 | 2 | 3) => {
      setCardCount(n);
      play();
      void hapticLight();
      setFlowStep('shuffling');
    },
    [play, setCardCount]
  );

  const handleDrawAgain = () => {
    resetReading();
    setFlowStep('chooseCount');
  };

  const handleNewCategory = () => {
    clearCategory();
    navigate('/home');
  };

  const stepTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      className={styles.page}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className={styles.header}>
        <button
          type="button"
          className={`${styles.back} pressable`}
          onClick={() => navigate('/home')}
        >
          ← {m.readingBack}
        </button>
        {!showResult && flowStep === 'chooseCount' ? (
          <div className={styles.titleBlock}>
            <h1 className={styles.mainTitle}>{m.chooseCountTitle}</h1>
            <p className={styles.topicLine}>{m.readingTitle(topicLabel)}</p>
          </div>
        ) : !showResult && flowStep === 'shuffling' ? (
          <div className={styles.titleBlock}>
            <p className={styles.topicLine}>{m.readingTitle(topicLabel)}</p>
          </div>
        ) : null}
      </header>

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            key="result"
            className={styles.resultBlock}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={stepTransition}
          >
            <CardList cards={drawn} revealed />
            <ResultScreen
              title={m.resultTitle}
              text={interpretation}
              onDrawAgain={handleDrawAgain}
              onNewCategory={handleNewCategory}
              drawAgainLabel={m.drawAgain}
              chooseCategoryLabel={m.chooseCategory}
            />
          </motion.div>
        ) : flowStep === 'chooseCount' ? (
          <motion.section
            key="count"
            className={styles.countStage}
            role="group"
            aria-label={m.chooseCountGroup}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={stepTransition}
          >
            <div className={styles.countGrid}>
              <button
                type="button"
                className={`${styles.countCard} pressable`}
                onClick={() => handleCount(1)}
              >
                <span className={styles.countNum}>1</span>
                <span className={styles.countLabel}>{m.countOneCard}</span>
              </button>
              <button
                type="button"
                className={`${styles.countCard} pressable`}
                onClick={() => handleCount(2)}
              >
                <span className={styles.countNum}>2</span>
                <span className={styles.countLabel}>{m.countTwoCards}</span>
              </button>
              <button
                type="button"
                className={`${styles.countCard} pressable`}
                onClick={() => handleCount(3)}
              >
                <span className={styles.countNum}>3</span>
                <span className={styles.countLabel}>{m.countThreeCards}</span>
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="shuffle"
            className={styles.shuffleStage}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={stepTransition}
            aria-busy="true"
          >
            <ShuffleDeck animate={!reduceMotion} />
            <p className={styles.shuffleText} role="status" aria-live="polite">
              {m.loadingShuffle}
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
