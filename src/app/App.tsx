import { Navigate, Route, Routes } from 'react-router-dom';
import { AppControls } from '@/components/AppControls/AppControls';
import { FortuneProvider } from '@/features/fortune-reading/FortuneContext';
import { SettingsProvider } from '@/shared/contexts/SettingsContext';
import { HomePage } from '@/pages/HomePage/HomePage';
import { IntroPage } from '@/pages/IntroPage/IntroPage';
import { ReadingPage } from '@/pages/ReadingPage/ReadingPage';
import styles from './App.module.scss';

export function App() {
  return (
    <SettingsProvider>
      <FortuneProvider>
        <div className={styles.shell}>
          <AppControls />
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </FortuneProvider>
    </SettingsProvider>
  );
}
