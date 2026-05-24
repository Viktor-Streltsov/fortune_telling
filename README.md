# Mystic Cards — Fortune Telling App

A mystical card-reading web app with Android support, built with React, TypeScript, Vite, and Capacitor.

## Features

- **4 reading categories** — Love, Daily, Career, Money
- **1–3 card draws** per session with individual card interpretations
- **3 themes** — Witch (default), Light, Dark
- **2 languages** — English / Russian (persisted in localStorage)
- **Sound effects** on card draw and controls (toggle on/off)
- **Animated transitions** powered by Framer Motion
- **Splash screen & intro flow** for a polished first-launch experience
- **Android app** via Capacitor (full edge-to-edge, immersive mode)
- **Web deployment** on Vercel (single-page app with HTML rewrite)

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18, TypeScript |
| Bundler | Vite 5 |
| Styling | SCSS Modules + CSS custom properties (themes) |
| Animation | Framer Motion |
| Routing | React Router v6 |
| Native | Capacitor 8 (Android), Haptics, Status Bar, Splash Screen |
| Fonts | Cormorant Garamond, Outfit (Google Fonts) |

## Project Structure

```
src/
├── app/             # Root layout, animated route wrapper
├── components/      # Shared UI components
│   ├── Card/            # Single fortune card (flip animation)
│   ├── CardDeck/        # Deck visual
│   ├── CardList/        # Drawn cards list
│   ├── CategorySelector/# Reading category picker
│   ├── ResultScreen/    # Spread result view
│   ├── SettingsModal/   # Settings panel (language, theme, sound)
│   ├── ShuffleDeck/     # Shuffle animation
│   └── WitchBackground/ # Atmospheric background
├── pages/
│   ├── SplashScreen/    # First-launch splash
│   ├── IntroPage/       # Welcome / intro screen
│   ├── HomePage/        # Category selection
│   └── ReadingPage/     # Card draw & result
├── shared/
│   ├── contexts/        # SettingsContext (locale, theme, sound)
│   ├── hooks/           # useDrawSound, useBodyScrollLock, useMediaQuery
│   ├── i18n/            # messages.ts — EN/RU strings
│   ├── lib/             # cardImages, interpretation, random, schedule
│   ├── native/          # Haptics wrapper
│   ├── theme/           # themeMeta
│   └── types/           # Shared TypeScript types
├── data/            # Card data & images
└── styles/          # Global SCSS, variables, themes
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run locally

```bash
npm install
npm run dev
```

App opens at `http://localhost:5173`.

### Build for web

```bash
npm run build
npm run preview   # preview production build locally
```

Output goes to `build/`.

## Android Development

See [docs/CAPACITOR_ANDROID.md](docs/CAPACITOR_ANDROID.md) for the full guide.

**Quick workflow:**

```bash
# Build web assets + sync into Android project
npm run android:sync

# Open in Android Studio
npm run android:open
```

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run cap:copy` | Copy `build/` into Android assets |
| `npm run cap:sync` | Copy + update native dependencies |
| `npm run cap:open:android` | Open Android project in Android Studio |
| `npm run android:sync` | `build` + `cap sync` in one step |
| `npm run android:open` | `android:sync` + open Android Studio |

## Theming

Three built-in themes driven by CSS custom properties on `<html data-theme="...">`:

| Theme ID | Name |
|---|---|
| `witch` | Witch (default — dark purple) |
| `light` | Light |
| `dark` | Dark |

Theme, language, and sound preference are persisted to `localStorage` under the keys defined in `src/shared/lib/storageKeys.ts`.

## Localization

All UI strings are in `src/shared/i18n/messages.ts` under `en` and `ru` keys. To add a language, extend the `Locale` type in `src/shared/types/index.ts` and add a matching entry in `MESSAGES`.

## Deployment (Vercel)

The repo includes `vercel.json` configured for Vite output:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Push to your Vercel-connected repository and it deploys automatically.

## License

Private project — all rights reserved.
