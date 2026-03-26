import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useSettings } from '@/shared/contexts/SettingsContext';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { t } from '@/shared/i18n/messages';
import { THEME_ORDER } from '@/shared/theme/themeMeta';
import type { Locale, ThemeId } from '@/shared/types';
import { IconClose, IconGlobe, IconPalette, IconVolume } from './settingsIcons';
import styles from './SettingsModal.module.scss';

const SHEET_MQ = '(max-width: 640px)';

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { locale, theme, soundEnabled, setLocale, setTheme, setSoundEnabled } = useSettings();
  const m = t(locale);
  const reduceMotion = useReducedMotion();
  const isSheet = useMediaQuery(SHEET_MQ);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dragY, setDragY] = useState(0);
  const dragActive = useRef(false);
  const dragStartY = useRef(0);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const tmr = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => window.clearTimeout(tmr);
  }, [open]);

  useEffect(() => {
    if (!open) setDragY(0);
  }, [open]);

  const endSheetDrag = useCallback(() => {
    if (!dragActive.current) return;
    dragActive.current = false;
    setDragY((y) => {
      if (y > 88) onClose();
      return 0;
    });
  }, [onClose]);

  const onHandlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isSheet || reduceMotion) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragActive.current = true;
      dragStartY.current = e.clientY;
    },
    [isSheet, reduceMotion]
  );

  const onHandlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragActive.current || !isSheet) return;
      setDragY(Math.max(0, e.clientY - dragStartY.current));
    },
    [isSheet]
  );

  const onHandlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isSheet) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      endSheetDrag();
    },
    [isSheet, endSheetDrag]
  );

  const backdropDur = reduceMotion ? 0 : 0.22;
  const panelDur = reduceMotion ? 0 : 0.32;
  const ease = [0.22, 1, 0.36, 1] as const;

  const panel = (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`${styles.panel} ${isSheet ? styles.panelSheet : styles.panelModal}`}
      initial={
        isSheet
          ? { y: '100%' }
          : reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.96 }
      }
      animate={
        isSheet
          ? { y: 0 }
          : reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, scale: 1 }
      }
      exit={
        isSheet
          ? { y: '100%' }
          : reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.96 }
      }
      transition={{ duration: panelDur, ease }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className={styles.panelInner}
        style={isSheet ? { transform: `translateY(${dragY}px)` } : undefined}
      >
        {isSheet ? (
          <div
            className={styles.handleWrap}
            onPointerDown={onHandlePointerDown}
            onPointerMove={onHandlePointerMove}
            onPointerUp={onHandlePointerUp}
            onPointerCancel={onHandlePointerUp}
          >
            <span className={styles.handle} aria-hidden />
          </div>
        ) : null}

        <div className={styles.head}>
          <h2 id={titleId} className={styles.headTitle}>
            {m.settingsTitle}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={`${styles.closeBtn} pressable`}
            onClick={onClose}
            aria-label={m.settingsClose}
          >
            <IconClose className={styles.closeIcon} aria-hidden />
          </button>
        </div>

        <div className={styles.body}>
          <section className={styles.section} aria-labelledby={`${titleId}-lang`}>
            <div className={styles.sectionHead}>
              <IconGlobe className={styles.sectionIcon} aria-hidden />
              <div className={styles.sectionTitles}>
                <p id={`${titleId}-lang`} className={styles.sectionLabel}>
                  {m.controlsLanguage}
                </p>
                <p className={styles.sectionHint}>{m.settingsLanguageHint}</p>
              </div>
            </div>
            <div className={styles.segment} role="group" aria-label={m.controlsLanguage}>
              {(['en', 'ru'] as const).map((l: Locale) => (
                <button
                  key={l}
                  type="button"
                  className={`${styles.segBtn} pressable ${locale === l ? styles.segBtnActive : ''}`}
                  onClick={() => setLocale(l)}
                  aria-pressed={locale === l}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby={`${titleId}-theme`}>
            <div className={styles.sectionHead}>
              <IconPalette className={styles.sectionIcon} aria-hidden />
              <div className={styles.sectionTitles}>
                <p id={`${titleId}-theme`} className={styles.sectionLabel}>
                  {m.controlsTheme}
                </p>
                <p className={styles.sectionHint}>{m.settingsThemeHint}</p>
              </div>
            </div>
            <div className={styles.segment} role="group" aria-label={m.controlsTheme}>
              {THEME_ORDER.map((th: ThemeId) => (
                <button
                  key={th}
                  type="button"
                  className={`${styles.segBtn} pressable ${theme === th ? styles.segBtnActive : ''}`}
                  onClick={() => setTheme(th)}
                  aria-pressed={theme === th}
                >
                  {th === 'witch' ? m.themeWitch : th === 'light' ? m.themeLight : m.themeDark}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby={`${titleId}-sound`}>
            <div className={styles.sectionHead}>
              <IconVolume className={styles.sectionIcon} aria-hidden />
              <div className={styles.sectionTitles}>
                <p id={`${titleId}-sound`} className={styles.sectionLabel}>
                  {m.soundLabel}
                </p>
                <p className={styles.sectionHint}>{m.settingsSoundHint}</p>
              </div>
            </div>
            <div className={styles.segment} role="group" aria-label={m.soundLabel}>
              <button
                type="button"
                className={`${styles.segBtn} pressable ${soundEnabled ? styles.segBtnActive : ''}`}
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? m.soundOn : m.soundOff}
              </button>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );

  const content = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="settings-overlay"
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: backdropDur }}
        >
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label={m.settingsClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: backdropDur }}
            onClick={onClose}
          />
          <div
            className={`${styles.sheetContainer} ${!isSheet ? styles.sheetContainerDesktop : ''}`}
          >
            <div className={styles.sheetInner}>{panel}</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(content, document.body);
}
