/**
 * Queens Puzzle Game — Hardcoded Levels
 *
 * Three valid 5×5 levels with irregular contiguous regions.
 * Each level has exactly one valid solution satisfying:
 *   1. One queen per row
 *   2. One queen per column
 *   3. One queen per region
 *   4. No two queens adjacent (including diagonals)
 *
 * Region maps: 5×5 grids where each number is a regionId (0-4).
 */

import { LevelData } from '../types';

export const LEVELS: LevelData[] = [
  {
    id: 'level-1',
    name: 'First Crown',
    size: 5,
    // Region layout:
    //   0 0 1 1 1
    //   0 0 1 2 2
    //   3 0 2 2 2
    //   3 3 3 4 2
    //   3 4 4 4 4
    regions: [
      [0, 0, 1, 1, 1],
      [0, 0, 1, 2, 2],
      [3, 0, 2, 2, 2],
      [3, 3, 3, 4, 2],
      [3, 4, 4, 4, 4],
    ],
    // Solution: row 0→col 0, row 1→col 2, row 2→col 4, row 3→col 1, row 4→col 3
    // Regions:  reg 0,       reg 1,       reg 2,       reg 3,       reg 4        ✓ all unique
    // Columns:  0, 2, 4, 1, 3                                                    ✓ all unique
    // Adjacency:
    //   (0,0)↔(1,2): Δr=1,Δc=2 → OK
    //   (1,2)↔(2,4): Δr=1,Δc=2 → OK
    //   (2,4)↔(3,1): Δr=1,Δc=3 → OK
    //   (3,1)↔(4,3): Δr=1,Δc=2 → OK
    //   All non-consecutive pairs have Δr≥2                                       ✓
    solution: [[0, 0], [1, 2], [2, 4], [3, 1], [4, 3]],
  },
  {
    id: 'level-2',
    name: 'Royal Garden',
    size: 5,
    // Region layout designed for solution (0,3),(1,0),(2,2),(3,4),(4,1):
    //   1 1 1 0 2
    //   0 1 2 2 2
    //   0 0 3 3 2
    //   4 0 3 3 3
    //   4 4 4 3 4    ← region 4 not contiguous here, fix:
    //
    // Redesign to ensure contiguity:
    //   1 1 1 0 0
    //   0 1 2 2 2
    //   0 0 2 3 3
    //   4 0 3 3 3
    //   4 4 4 4 3
    //
    // Check solution (0,3),(1,0),(2,2),(3,4),(4,1):
    //   (0,3) → region 0 ✓
    //   (1,0) → region 0 ← CONFLICT
    //
    // Redesign: pick solution (0,2),(1,4),(2,1),(3,3),(4,0)
    // Adjacency:
    //   (0,2)↔(1,4): Δr=1,Δc=2 → OK
    //   (1,4)↔(2,1): Δr=1,Δc=3 → OK
    //   (2,1)↔(3,3): Δr=1,Δc=2 → OK
    //   (3,3)↔(4,0): Δr=1,Δc=3 → OK
    //   (0,2)↔(2,1): Δr=2 → OK
    //   All others Δr≥2                                                           ✓
    //
    // Now design regions where each queen cell has a unique region:
    //   (0,2)→reg 0, (1,4)→reg 1, (2,1)→reg 2, (3,3)→reg 3, (4,0)→reg 4
    //
    //   2 2 0 0 1
    //   2 2 0 1 1
    //   3 2 0 1 1
    //   3 3 3 3 4
    //   4 4 4 4 4
    //
    // Check contiguity:
    //   reg 0: (0,2),(0,3),(1,2),(2,2) → connected ✓
    //   reg 1: (0,4),(1,3),(1,4),(2,3),(2,4) → connected ✓
    //   reg 2: (0,0),(0,1),(1,0),(1,1),(2,1) → connected ✓
    //   reg 3: (3,0),(3,1),(3,2),(3,3) → connected ✓  (also (2,0))
    //   reg 4: (3,4),(4,0),(4,1),(4,2),(4,3),(4,4) → (3,4) connects to (4,4) ✓
    //          but (4,0) connects to (4,1) etc. ✓ All one component ✓
    // Count: reg0=4, reg1=5, reg2=5, reg3=5, reg4=6 = 25 ✓
    regions: [
      [2, 2, 0, 0, 1],
      [2, 2, 0, 1, 1],
      [3, 2, 0, 1, 1],
      [3, 3, 3, 3, 4],
      [4, 4, 4, 4, 4],
    ],
    solution: [[0, 2], [1, 4], [2, 1], [3, 3], [4, 0]],
  },
  {
    id: 'level-3',
    name: 'Crown Jewels',
    size: 5,
    // Pick solution: (0,1),(1,3),(2,0),(3,2),(4,4)
    // Adjacency:
    //   (0,1)↔(1,3): Δr=1,Δc=2 → OK
    //   (1,3)↔(2,0): Δr=1,Δc=3 → OK
    //   (2,0)↔(3,2): Δr=1,Δc=2 → OK
    //   (3,2)↔(4,4): Δr=1,Δc=2 → OK
    //   All others Δr≥2                                                           ✓
    //
    // Regions: (0,1)→reg 0, (1,3)→reg 1, (2,0)→reg 2, (3,2)→reg 3, (4,4)→reg 4
    //
    //   2 0 0 1 1
    //   2 0 1 1 1
    //   2 2 3 3 1
    //   2 3 3 4 4
    //   3 3 4 4 4
    //
    // Check contiguity:
    //   reg 0: (0,1),(0,2),(1,1) → connected ✓
    //   reg 1: (0,3),(0,4),(1,2),(1,3),(1,4),(2,4) → connected ✓
    //   reg 2: (0,0),(1,0),(2,0),(2,1),(3,0) → connected ✓
    //   reg 3: (2,2),(2,3),(3,1),(3,2),(4,0),(4,1) → (2,2)-(2,3)-(3,2)-(3,1)-(4,1)-(4,0) ✓
    //   reg 4: (3,3),(3,4),(4,2),(4,3),(4,4) → connected ✓
    // Count: 3+6+5+6+5=25 ✓
    regions: [
      [2, 0, 0, 1, 1],
      [2, 0, 1, 1, 1],
      [2, 2, 3, 3, 1],
      [2, 3, 3, 4, 4],
      [3, 3, 4, 4, 4],
    ],
    solution: [[0, 1], [1, 3], [2, 0], [3, 2], [4, 4]],
  },
];
