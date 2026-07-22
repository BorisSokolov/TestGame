/**
 * Queens Puzzle Game — Auto-Elimination Logic
 *
 * When a queen is placed, automatically mark ("X") all cells
 * in the same row, column, and all 8 adjacent cells.
 * When a queen is removed, recompute eliminations from all remaining queens.
 */

import { Cell, CellState, ADJACENT_OFFSETS } from '../types';
import { isInBounds, findQueens } from './constraints';

/**
 * Compute all cells that should be auto-eliminated by a queen at (queenRow, queenCol).
 * Returns a Set of "row,col" keys.
 */
export function getCellsToEliminate(
  size: number,
  queenRow: number,
  queenCol: number
): Set<string> {
  const cells = new Set<string>();

  // Entire row
  for (let c = 0; c < size; c++) {
    if (c !== queenCol) {
      cells.add(`${queenRow},${c}`);
    }
  }

  // Entire column
  for (let r = 0; r < size; r++) {
    if (r !== queenRow) {
      cells.add(`${r},${queenCol}`);
    }
  }

  // All 8 adjacent cells (diagonals included)
  for (const [dr, dc] of ADJACENT_OFFSETS) {
    const nr = queenRow + dr;
    const nc = queenCol + dc;
    if (isInBounds(nr, nc, size)) {
      cells.add(`${nr},${nc}`);
    }
  }

  return cells;
}

/**
 * Apply auto-eliminations to the grid based on all currently placed queens.
 * This recomputes from scratch to handle queen removal correctly.
 *
 * Rules:
 *   - Cells with manually placed X's (isAutoEliminated = false) are preserved
 *   - Cells with queens are never overwritten
 *   - Empty cells in the elimination zone get auto-X
 *   - Previously auto-eliminated cells NOT in any queen's zone revert to empty
 */
export function applyAutoEliminations(grid: Cell[][]): Cell[][] {
  const size = grid.length;
  const queens = findQueens(grid);

  // Compute the union of all elimination zones
  const eliminationZone = new Set<string>();
  for (const [qr, qc] of queens) {
    const zone = getCellsToEliminate(size, qr, qc);
    for (const key of zone) {
      eliminationZone.add(key);
    }
  }

  // Apply eliminations
  const newGrid: Cell[][] = grid.map((row) =>
    row.map((cell) => {
      const key = `${cell.row},${cell.col}`;

      // Never touch queen cells
      if (cell.state === CellState.QUEEN) {
        return cell;
      }

      // If this cell is in an elimination zone
      if (eliminationZone.has(key)) {
        if (cell.state === CellState.EMPTY) {
          // Auto-eliminate empty cells in the zone
          return { ...cell, state: CellState.ELIMINATED, isAutoEliminated: true };
        }
        if (cell.state === CellState.ELIMINATED && !cell.isAutoEliminated) {
          // Preserve manually placed X's
          return cell;
        }
        // Already auto-eliminated, keep as is
        return { ...cell, state: CellState.ELIMINATED, isAutoEliminated: true };
      }

      // Cell is NOT in any elimination zone
      if (cell.state === CellState.ELIMINATED && cell.isAutoEliminated) {
        // Remove stale auto-eliminations (queen was removed)
        return { ...cell, state: CellState.EMPTY, isAutoEliminated: false };
      }

      return cell;
    })
  );

  return newGrid;
}
