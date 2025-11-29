# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Expo-based React Native mobile application built with TypeScript. It uses Expo Router for file-based navigation and supports iOS, Android, and web platforms. The project is configured with React Native's new architecture enabled (`newArchEnabled: true`) and experimental features including typed routes and React Compiler.

## Development Commands

### Setup and Running
```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npx expo start

# Run on specific platforms
npm run android  # Android emulator
npm run ios      # iOS simulator
npm run web      # Web browser
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

### Project Reset
```bash
# Move current app to app-example and create blank app directory
npm run reset-project
```

## Architecture

### Navigation Structure
The app uses **Expo Router** with file-based routing:
- `app/_layout.tsx` - Root layout with Stack navigator and theme provider
- `app/(tabs)/` - Tab-based navigation group
  - `_layout.tsx` - Tab navigator configuration
  - `index.tsx` - Home screen (default tab)
  - `explore.tsx` - Explore screen
- `app/modal.tsx` - Modal screen example

The root layout sets `(tabs)` as the anchor route (`unstable_settings.anchor`).

### Theming System
The app implements a comprehensive light/dark theme system:

**Color Management:**
- `constants/theme.ts` - Defines `Colors` object with light/dark color schemes
- `hooks/use-color-scheme.ts` - Re-exports React Native's `useColorScheme` hook
- `hooks/use-color-scheme.web.ts` - Web-specific color scheme hook
- `hooks/use-theme-color.ts` - Custom hook that returns appropriate color based on current theme

**Themed Components:**
- `components/themed-text.tsx` - `ThemedText` component with built-in text styles (default, title, subtitle, link, defaultSemiBold)
- `components/themed-view.tsx` - `ThemedView` component with automatic background color switching

**Font Configuration:**
- `constants/theme.ts` exports `Fonts` object with platform-specific font families (sans, serif, rounded, mono)
- Different font stacks for iOS, web, and default platforms

### Component Organization
- `components/` - Reusable components
  - `ui/` - UI primitives
    - `icon-symbol.tsx` - Icon component with platform-specific implementation
    - `icon-symbol.ios.tsx` - iOS-specific SF Symbols implementation
    - `collapsible.tsx` - Collapsible container component
  - `haptic-tab.tsx` - Tab bar button with haptic feedback
  - `parallax-scroll-view.tsx` - Parallax scrolling container
  - `external-link.tsx` - External link handler
  - `hello-wave.tsx` - Animated wave component

### Path Aliases
TypeScript is configured with `@/*` path alias mapping to the root directory:
```typescript
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
```

## Key Technologies
- **Expo SDK ~54.0** - Development framework
- **React 19.1.0** - UI library
- **React Native 0.81.5** - Mobile framework
- **Expo Router ~6.0** - File-based routing
- **React Navigation** - Navigation infrastructure (v7+)
- **TypeScript 5.9** - Type safety with strict mode enabled
- **ESLint** - Code linting with expo config
- **React Native Reanimated** - Animations
- **Expo Image** - Optimized image component

## Development Practices

### TypeScript Configuration
- Strict mode is enabled
- Typed routes are enabled via `experiments.typedRoutes` in app.json
- All TypeScript/TSX files are included in compilation

### Platform-Specific Code
The codebase uses platform-specific file extensions and Platform.select():
- `.ios.tsx` / `.android.tsx` / `.web.tsx` for platform-specific implementations
- `Platform.select()` for inline platform checks

### Asset Management
- Icons: Uses `@expo/vector-icons` and SF Symbols (iOS)
- Images: Stored in `assets/images/`
- Splash screen and app icons configured in app.json

### Deep Linking
The app is configured with URL scheme `dralaflowmobile://` for deep linking.

## Important Notes

- The app uses Expo Go for quick testing, but also supports custom development builds
- React Compiler is enabled experimentally - be aware of optimization behavior
- Edge-to-edge mode is enabled on Android
- Predictive back gesture is disabled on Android
- Web output is configured as static
