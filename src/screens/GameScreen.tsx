/**
 * Queens Puzzle Game — GameScreen
 *
 * Main game screen wrapping:
 *   - GameProvider (context)
 *   - Header (level info, queen counter, reset)
 *   - GridView (the puzzle grid)
 *   - WinModal (victory overlay)
 */

import React, { useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { GameProvider, useGame } from '../context/GameContext';
import { Header } from '../components/Header';
import { GridView } from '../components/GridView';
import { WinModal } from '../components/WinModal';
import { LEVELS } from '../constants/levels';
import { THEME } from '../constants/colors';

interface GameScreenProps {
  levelId: string;
  onBack: () => void;
}

function GameScreenInner({ onBack }: { onBack: () => void }) {
  const { state, resetLevel, loadLevel } = useGame();

  const handleNextLevel = useCallback(() => {
    const currentIndex = LEVELS.findIndex((l) => l.id === state.level.id);
    const nextIndex = (currentIndex + 1) % LEVELS.length;
    loadLevel(LEVELS[nextIndex].id);
  }, [state.level.id, loadLevel]);

  const handleReplay = useCallback(() => {
    resetLevel();
  }, [resetLevel]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={onBack} />
      <View style={styles.gridWrapper}>
        <GridView />
      </View>
      <WinModal
        visible={state.isComplete}
        levelName={state.level.name}
        onNextLevel={handleNextLevel}
        onReplay={handleReplay}
      />
    </SafeAreaView>
  );
}

export function GameScreen({ levelId, onBack }: GameScreenProps) {
  return (
    <GameProvider>
      <GameScreenLoader levelId={levelId} onBack={onBack} />
    </GameProvider>
  );
}

/** Inner component that loads the correct level after the provider mounts */
function GameScreenLoader({
  levelId,
  onBack,
}: {
  levelId: string;
  onBack: () => void;
}) {
  const { loadLevel } = useGame();

  // Load the requested level on mount
  React.useEffect(() => {
    loadLevel(levelId);
  }, [levelId, loadLevel]);

  return <GameScreenInner onBack={onBack} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  gridWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
