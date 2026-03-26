import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/App';
import { initCapacitorNative } from '@/native/capacitorInit';
import '@/styles/global.scss';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    void initCapacitorNative();
  });
});
