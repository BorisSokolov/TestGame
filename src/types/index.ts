/**
 * Queens Puzzle Game — Core Type Definitions
 *
 * Data structures for the 1-Star Battle (LinkedIn Queens) puzzle.
 */

/** Cell state cycle: EMPTY → ELIMINATED → QUEEN → EMPTY */
export enum CellState {
  EMPTY = 'empty',
  ELIMINATED = 'eliminated', // "X" marker
  QUEEN = 'queen',
}

/** Represents a single cell in the puzzle grid */
export interface Cell {
  row: number;
  col: number;
  regionId: number; // Which color region this cell belongs to
  state: CellState;
  isAutoEliminated: boolean; // Was this X placed automatically by a Queen?
}

/** Defines a puzzle level */
export interface LevelData {
  id: string;
  name: string;
  size: number; // Grid dimension (5 = 5×5)
  regions: number[][]; // 2D array where each value is a regionId (0-indexed)
  solution: [number, number][]; // Array of [row, col] queen positions
}

/** Full game state managed by the reducer */
export interface GameState {
  level: LevelData;
  grid: Cell[][]; // size × size matrix
  queensPlaced: number; // Count of queens on board
  isComplete: boolean; // Puzzle solved?
  conflicts: Set<string>; // Set of "row,col" keys for cells in conflict
}

/** Actions for the game reducer */
export type GameAction =
  | { type: 'TAP_CELL'; row: number; col: number }
  | { type: 'RESET_LEVEL' }
  | { type: 'LOAD_LEVEL'; level: LevelData };

/** Direction offsets for the 8 adjacent cells (including diagonals) */
export const ADJACENT_OFFSETS: [number, number][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];
