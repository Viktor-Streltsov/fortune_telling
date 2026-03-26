import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Native shell: status bar + hide splash after the WebView has painted.
 * Safe to call from web; no-ops in browser.
 */
export async function initCapacitorNative(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0e0a18' });
  } catch {
    /* ignore */
  }

  requestAnimationFrame(() => {
    void SplashScreen.hide({ fadeOutDuration: 400 }).catch(() => {
      /* ignore */
    });
  });
}
