# Queens Puzzle Game

A mobile puzzle game inspired by "LinkedIn Queens," built with React Native and Expo. 

## Features
- **Grid Constraints Checking**: Enforces game rules where Queens cannot share the same row, column, or region, and cannot touch each other (even diagonally).
- **Auto-Elimination**: Smart mechanics that auto-eliminate cells when a Queen is placed.
- **Minimalist UI**: Clean design featuring intuitive touch and gesture handling.
- **Cross-Platform**: Built with Expo, ready to run on both iOS and Android.

## Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- `npm` (comes with Node.js) or `yarn`
- [Expo Go app](https://expo.dev/client) on your iOS or Android device, or a configured emulator/simulator.

## Installation

1. Clone the repository (or download the source):
   ```bash
   git clone <your-repository-url>
   cd TestGame
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

Start the Expo development server:

```bash
npx expo start
```

This will open a Metro bundler terminal and a browser window. From there, you can:
- Scan the QR code using the **Expo Go** app on your physical device.
- Press `a` to run on an Android emulator (if configured).
- Press `i` to run on an iOS simulator (macOS only, if configured).

## License
MIT License
