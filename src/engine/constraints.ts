/**
 * Queens Puzzle Game — Constraint Validation Engine
 *
 * Validates all puzzle rules:
 *   1. At most one queen per row
 *   2. At most one queen per column
 *   3. At most one queen per region
 *   4. No two queens adjacent (including diagonals)
 */

import { Cell, CellState, ADJACENT_OFFSETS } from '../types';

/** Check if a position is within grid bounds */
export function isInBounds(row: number, col: number, size: number): boolean {
  return row >= 0 && row < size && col >= 0 && col < size;
}

/** Find all queen positions in the grid */
export function findQueens(grid: Cell[][]): [number, number][] {
  const queens: [number, number][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c].state === CellState.QUEEN) {
        queens.push([r, c]);
      }
    }
  }
  return queens;
}

/**
 * Check for row conflicts.
 * Returns set of "row,col" keys for queens that share a row with another queen.
 */
export function checkRowConflicts(grid: Cell[][]): Set<string> {
  const conflicts = new Set<string>();
  const size = grid.length;

  for (let r = 0; r < size; r++) {
    const queensInRow: [number, number][] = [];
    for (let c = 0; c < size; c++) {
      if (grid[r][c].state === CellState.QUEEN) {
        queensInRow.push([r, c]);
      }
    }
    if (queensInRow.length > 1) {
      for (const [qr, qc] of queensInRow) {
        conflicts.add(`${qr},${qc}`);
      }
    }
  }

  return conflicts;
}

/**
 * Check for column conflicts.
 * Returns set of "row,col" keys for queens that share a column with another queen.
 */
export function checkColConflicts(grid: Cell[][]): Set<string> {
  const conflicts = new Set<string>();
  const size = grid.length;

  for (let c = 0; c < size; c++) {
    const queensInCol: [number, number][] = [];
    for (let r = 0; r < size; r++) {
      if (grid[r][c].state === CellState.QUEEN) {
        queensInCol.push([r, c]);
      }
    }
    if (queensInCol.length > 1) {
      for (const [qr, qc] of queensInCol) {
        conflicts.add(`${qr},${qc}`);
      }
    }
  }

  return conflicts;
}

/**
 * Check for region conflicts.
 * Returns set of "row,col" keys for queens that share a region with another queen.
 */
export function checkRegionConflicts(grid: Cell[][]): Set<string> {
  const conflicts = new Set<string>();
  const regionQueens = new Map<number, [number, number][]>();

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c].state === CellState.QUEEN) {
        const regionId = grid[r][c].regionId;
        if (!regionQueens.has(regionId)) {
          regionQueens.set(regionId, []);
        }
        regionQueens.get(regionId)!.push([r, c]);
      }
    }
  }

  for (const [, queens] of regionQueens) {
    if (queens.length > 1) {
      for (const [qr, qc] of queens) {
        conflicts.add(`${qr},${qc}`);
      }
    }
  }

  return conflicts;
}

/**
 * Check for diagonal/adjacency conflicts.
 * Returns set of "row,col" keys for queens that are adjacent to another queen
 * (including diagonally — all 8 surrounding cells).
 */
export function checkAdjacentConflicts(grid: Cell[][]): Set<string> {
  const conflicts = new Set<string>();
  const size = grid.length;
  const queens = findQueens(grid);

  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      const [r1, c1] = queens[i];
      const [r2, c2] = queens[j];

      // Two queens are adjacent if they differ by at most 1 in both row and column
      if (Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1) {
        conflicts.add(`${r1},${c1}`);
        conflicts.add(`${r2},${c2}`);
      }
    }
  }

  return conflicts;
}

/**
 * Validate the entire board.
 * Returns all conflicts found across all constraint types.
 */
export function validateBoard(grid: Cell[][]): {
  isValid: boolean;
  conflicts: Set<string>;
} {
  const allConflicts = new Set<string>();

  const rowConflicts = checkRowConflicts(grid);
  const colConflicts = checkColConflicts(grid);
  const regionConflicts = checkRegionConflicts(grid);
  const adjacentConflicts = checkAdjacentConflicts(grid);

  for (const c of rowConflicts) allConflicts.add(c);
  for (const c of colConflicts) allConflicts.add(c);
  for (const c of regionConflicts) allConflicts.add(c);
  for (const c of adjacentConflicts) allConflicts.add(c);

  return {
    isValid: allConflicts.size === 0,
    conflicts: allConflicts,
  };
}

/**
 * Check if the puzzle is solved.
 * All win conditions must be met:
 *   - Exactly one queen per row
 *   - Exactly one queen per column
 *   - Exactly one queen per region
 *   - No adjacency conflicts
 */
export function checkWinCondition(grid: Cell[][], size: number): boolean {
  const queens = findQueens(grid);

  // Must have exactly N queens for an N×N grid
  if (queens.length !== size) {
    return false;
  }

  // Validate all constraints
  const { isValid } = validateBoard(grid);
  if (!isValid) {
    return false;
  }

  // Verify exactly one queen per row
  const rows = new Set(queens.map(([r]) => r));
  if (rows.size !== size) return false;

  // Verify exactly one queen per column
  const cols = new Set(queens.map(([, c]) => c));
  if (cols.size !== size) return false;

  // Verify exactly one queen per region
  const regions = new Set(queens.map(([r, c]) => grid[r][c].regionId));
  if (regions.size !== size) return false;

  return true;
}
