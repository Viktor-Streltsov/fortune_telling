import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor config — webDir must match Vite `build.outDir` (see vite.config.ts).
 * After `npm run build`, run `npx cap sync` to copy web assets into native projects.
 */
const config: CapacitorConfig = {
  appId: 'com.mysticcards.fortune',
  appName: 'Mystic Cards',
  webDir: 'build',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#0e0a18',
    // Edge-to-edge / immersive handled in Android theme + Status Bar plugin
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      backgroundColor: '#0e0a18',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0e0a18',
    },
  },
};

export default config;
