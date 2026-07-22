/**
 * Queens Puzzle Game — Game State Reducer
 *
 * Central state machine for the puzzle game.
 * Handles cell taps, level loading, and reset.
 */

import { Cell, CellState, GameState, GameAction, LevelData } from '../types';
import { validateBoard, checkWinCondition } from './constraints';
import { applyAutoEliminations } from './autoEliminate';

/** Create an empty grid from a level definition */
export function createGrid(level: LevelData): Cell[][] {
  const grid: Cell[][] = [];
  for (let r = 0; r < level.size; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < level.size; c++) {
      row.push({
        row: r,
        col: c,
        regionId: level.regions[r][c],
        state: CellState.EMPTY,
        isAutoEliminated: false,
      });
    }
    grid.push(row);
  }
  return grid;
}

/** Create initial game state from a level */
export function createInitialState(level: LevelData): GameState {
  return {
    level,
    grid: createGrid(level),
    queensPlaced: 0,
    isComplete: false,
    conflicts: new Set<string>(),
  };
}

/**
 * Cycle cell state based on tap:
 *   EMPTY → ELIMINATED (manual X)
 *   ELIMINATED → QUEEN
 *   QUEEN → EMPTY
 *
 * Special case: auto-eliminated cells cycle differently:
 *   AUTO_ELIMINATED → QUEEN (skip manual X, go straight to queen)
 */
function cycleState(cell: Cell): CellState {
  switch (cell.state) {
    case CellState.EMPTY:
      return CellState.ELIMINATED;
    case CellState.ELIMINATED:
      return CellState.QUEEN;
    case CellState.QUEEN:
      return CellState.EMPTY;
    default:
      return CellState.EMPTY;
  }
}

/** Count queens on the grid */
function countQueens(grid: Cell[][]): number {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.state === CellState.QUEEN) {
        count++;
      }
    }
  }
  return count;
}

/** The main game reducer */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TAP_CELL': {
      const { row, col } = action;

      // Don't allow moves after winning
      if (state.isComplete) {
        return state;
      }

      // Get current cell and determine next state
      const currentCell = state.grid[row][col];
      const nextState = cycleState(currentCell);

      // Create new grid with the tapped cell updated
      let newGrid = state.grid.map((r) =>
        r.map((cell) => {
          if (cell.row === row && cell.col === col) {
            return {
              ...cell,
              state: nextState,
              isAutoEliminated: false, // Manual action always clears auto flag
            };
          }
          return cell;
        })
      );

      // Recompute auto-eliminations
      newGrid = applyAutoEliminations(newGrid);

      // Validate the board
      const { isValid, conflicts } = validateBoard(newGrid);
      const queensPlaced = countQueens(newGrid);

      // Check win condition
      const isComplete =
        isValid && checkWinCondition(newGrid, state.level.size);

      return {
        ...state,
        grid: newGrid,
        queensPlaced,
        isComplete,
        conflicts,
      };
    }

    case 'RESET_LEVEL': {
      return createInitialState(state.level);
    }

    case 'LOAD_LEVEL': {
      return createInitialState(action.level);
    }

    default:
      return state;
  }
}
