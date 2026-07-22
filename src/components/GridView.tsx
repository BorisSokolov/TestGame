/**
 * Queens Puzzle Game — GridView Component
 *
 * Renders the N×N puzzle grid with:
 *   - Responsive cell sizing based on screen width
 *   - Region boundary detection for thick borders
 *   - Conflict highlighting passed to individual cells
 */

import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useGame } from '../context/GameContext';
import { CellView } from './CellView';
import { CELL_CONFIG, THEME } from '../constants/colors';

export function GridView() {
  const { state, dispatch } = useGame();
  const { grid, level, conflicts } = state;
  const { width: screenWidth } = useWindowDimensions();

  // Calculate cell size: fit grid within screen width minus padding
  const cellSize = useMemo(() => {
    const availableWidth =
      screenWidth - CELL_CONFIG.gridPadding * 2 - level.size * 2; // Account for borders
    const size = Math.floor(availableWidth / level.size);
    return Math.min(Math.max(size, CELL_CONFIG.minSize), CELL_CONFIG.maxSize);
  }, [screenWidth, level.size]);

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      dispatch({ type: 'TAP_CELL', row, col });
    },
    [dispatch]
  );

  // Precompute region borders for each cell
  const borderMap = useMemo(() => {
    const map: {
      [key: string]: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
      };
    } = {};

    for (let r = 0; r < level.size; r++) {
      for (let c = 0; c < level.size; c++) {
        const regionId = grid[r][c].regionId;
        map[`${r},${c}`] = {
          top: r === 0 || grid[r - 1][c].regionId !== regionId,
          bottom:
            r === level.size - 1 || grid[r + 1][c].regionId !== regionId,
          left: c === 0 || grid[r][c - 1].regionId !== regionId,
          right:
            c === level.size - 1 || grid[r][c + 1].regionId !== regionId,
        };
      }
    }

    return map;
  }, [grid, level.size]);

  return (
    <View style={styles.gridContainer}>
      <View
        style={[
          styles.grid,
          {
            borderColor: THEME.regionBorder,
            borderWidth: CELL_CONFIG.regionBorderWidth,
            borderRadius: 8,
            overflow: 'hidden',
          },
        ]}
      >
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell) => {
              const key = `${cell.row},${cell.col}`;
              const borders = borderMap[key];
              return (
                <CellView
                  key={key}
                  cell={cell}
                  cellSize={cellSize}
                  isConflict={conflicts.has(key)}
                  onPress={handleCellPress}
                  borderTop={borders.top}
                  borderBottom={borders.bottom}
                  borderLeft={borders.left}
                  borderRight={borders.right}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: CELL_CONFIG.gridPadding,
  },
  grid: {
    backgroundColor: THEME.regionBorder,
  },
  row: {
    flexDirection: 'row',
  },
});
