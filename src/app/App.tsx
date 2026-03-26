import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppSettingsChrome } from '@/components/AppSettingsChrome/AppSettingsChrome';
import { WitchBackground } from '@/components/WitchBackground/WitchBackground';
import { FortuneProvider } from '@/features/fortune-reading/FortuneContext';
import { SettingsProvider } from '@/shared/contexts/SettingsContext';
import { AnimatedLayout } from '@/app/AnimatedLayout';
import { AppFallback } from '@/components/AppFallback/AppFallback';
import styles from './App.module.scss';

const RootIndex = lazy(() =>
  import('@/pages/RootIndex/RootIndex').then((m) => ({ default: m.RootIndex }))
);
const IntroPage = lazy(() =>
  import('@/pages/IntroPage/IntroPage').then((m) => ({ default: m.IntroPage }))
);
const HomePage = lazy(() => import('@/pages/HomePage/HomePage').then((m) => ({ default: m.HomePage })));
const ReadingPage = lazy(() =>
  import('@/pages/ReadingPage/ReadingPage').then((m) => ({ default: m.ReadingPage }))
);

function AppRoutes() {
  const location = useLocation();
  const showMainChrome = location.pathname === '/home' || location.pathname === '/reading';

  return (
    <div className={`${styles.shell} ${showMainChrome ? styles.shellMain : ''}`}>
      <WitchBackground />
      {showMainChrome ? <AppSettingsChrome /> : null}
      <Suspense fallback={<AppFallback />}>
        <Routes>
          <Route path="/" element={<RootIndex />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route element={<AnimatedLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/reading" element={<ReadingPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export function App() {
  return (
    <SettingsProvider>
      <FortuneProvider>
        <AppRoutes />
      </FortuneProvider>
    </SettingsProvider>
  );
}
