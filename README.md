# Mobile GitHub Profile App

A sleek, minimal mobile application built with React Native and Expo Router. It provides a beautiful, modern viewing experience for GitHub profiles, complete with an iOS-style "floating tab island".

## Features

- **Dynamic Splash Screen:** Starts with an intuitive input screen allowing users to query any GitHub username.
- **Live Data Fetching:** Directly pulls live user data from `api.github.com`, displaying avatars, names, locations, and repository counts.
- **Contribution Graph Clone:** Features a meticulously crafted mockup of the GitHub contribution grid (simulated with randomized shades of green) to recreate the iconic widget experience.
- **Floating Tab Island:** The navigation uses Expo Router's `<Tabs>`, styled heavily to mimic a modern floating UI widget (similar to iPadOS 18 or custom iOS elements) with absolute positioning, high corner radiuses, and drop shadows.
- **Full Theme Support:** 100% compatible with both light and dark modes, automatically adapting backgrounds, text, and icons.

## Architecture

- **`app/index.tsx`**: The entry Splash Screen that captures the GitHub username and passes it to the main layout.
- **`app/(tabs)/_layout.tsx`**: The main navigation wrapper containing the custom floating tab styling.
- **`app/(tabs)/index.tsx`**: The primary GitHub dashboard. It reads the passed username via `useLocalSearchParams()`, fetches data, and renders the polished UI.
- **`app/(tabs)/profile.tsx`**: A placeholder profile screen accessible via the secondary tab.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the application (using tunnel to bypass local network restrictions):
   ```bash
   npm run tunnel
   ```
   *(Note: Ensure you clear the bundler cache with `npx expo start --clear --tunnel` if you experience routing issues).*
