/**
 * Queens Puzzle Game — React Context Provider
 *
 * Wraps the game reducer and provides state + dispatch to all children.
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { GameState, GameAction, LevelData } from '../types';
import { gameReducer, createInitialState } from '../engine/gameReducer';
import { LEVELS } from '../constants/levels';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  resetLevel: () => void;
  loadLevel: (levelId: string) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    gameReducer,
    LEVELS[0],
    createInitialState
  );

  const resetLevel = useCallback(() => {
    dispatch({ type: 'RESET_LEVEL' });
  }, []);

  const loadLevel = useCallback((levelId: string) => {
    const level = LEVELS.find((l) => l.id === levelId);
    if (level) {
      dispatch({ type: 'LOAD_LEVEL', level });
    }
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, resetLevel, loadLevel }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
