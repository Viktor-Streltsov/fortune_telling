import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/App';
import { initCapacitorNative } from '@/native/capacitorInit';
import '@/styles/global.scss';

/** Vite `base: './'` даёт BASE_URL `./` — некорректный basename ломает маршруты (/intro → * → /home). */
function routerBasename(): string | undefined {
  const raw = import.meta.env.BASE_URL;
  if (!raw || raw === '/' || raw === './' || raw === '.') return undefined;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    void initCapacitorNative();
  });
});
