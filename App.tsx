/**
 * Queens Puzzle Game — App Entry Point
 *
 * Simple stack navigation between HomeScreen and GameScreen
 * using basic React state (no navigation library needed for 2 screens).
 */

import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';

type Screen =
  | { type: 'home' }
  | { type: 'game'; levelId: string };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' });

  const handleSelectLevel = useCallback((levelId: string) => {
    setScreen({ type: 'game', levelId });
  }, []);

  const handleBack = useCallback(() => {
    setScreen({ type: 'home' });
  }, []);

  return (
    <>
      <StatusBar style="light" />
      {screen.type === 'home' ? (
        <HomeScreen onSelectLevel={handleSelectLevel} />
      ) : (
        <GameScreen levelId={screen.levelId} onBack={handleBack} />
      )}
    </>
  );
}
