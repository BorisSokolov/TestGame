/**
 * Queens Puzzle Game — CellView Component
 *
 * Renders a single cell with:
 *   - Region color background
 *   - State indicator (empty, X, or Queen)
 *   - Conflict highlighting
 *   - Region border detection (thick borders between different regions)
 *   - Reanimated spring animation on queen placement
 */

import React, { useCallback, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Cell, CellState } from '../types';
import { REGION_COLORS, THEME, CELL_CONFIG } from '../constants/colors';

interface CellViewProps {
  cell: Cell;
  cellSize: number;
  isConflict: boolean;
  onPress: (row: number, col: number) => void;
  // Border flags: which sides have a region boundary
  borderTop: boolean;
  borderBottom: boolean;
  borderLeft: boolean;
  borderRight: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function CellViewInner({
  cell,
  cellSize,
  isConflict,
  onPress,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
}: CellViewProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const conflictPulse = useSharedValue(1);

  // Animate queen placement
  useEffect(() => {
    if (cell.state === CellState.QUEEN) {
      scale.value = withSequence(
        withTiming(0.5, { duration: 50 }),
        withSpring(1, { damping: 8, stiffness: 200 })
      );
    }
  }, [cell.state]);

  // Conflict pulse animation
  useEffect(() => {
    if (isConflict) {
      conflictPulse.value = withSequence(
        withTiming(0.85, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );
    } else {
      conflictPulse.value = withTiming(1, { duration: 150 });
    }
  }, [isConflict]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * conflictPulse.value },
    ],
  }));

  const handlePress = useCallback(() => {
    // Small press feedback
    scale.value = withSequence(
      withTiming(0.9, { duration: 50 }),
      withSpring(1, { damping: 12, stiffness: 300 })
    );
    onPress(cell.row, cell.col);
  }, [cell.row, cell.col, onPress]);

  const regionColor = REGION_COLORS[cell.regionId % REGION_COLORS.length];
  const bgColor = isConflict
    ? `${THEME.conflict}40` // Semi-transparent red overlay
    : regionColor;

  const borderColor = isConflict ? THEME.conflict : THEME.regionBorder;

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[
        styles.cell,
        animatedStyle,
        {
          width: cellSize,
          height: cellSize,
          backgroundColor: bgColor,
          // Region borders (thick where regions differ)
          borderTopWidth: borderTop
            ? CELL_CONFIG.regionBorderWidth
            : CELL_CONFIG.borderWidth,
          borderBottomWidth: borderBottom
            ? CELL_CONFIG.regionBorderWidth
            : CELL_CONFIG.borderWidth,
          borderLeftWidth: borderLeft
            ? CELL_CONFIG.regionBorderWidth
            : CELL_CONFIG.borderWidth,
          borderRightWidth: borderRight
            ? CELL_CONFIG.regionBorderWidth
            : CELL_CONFIG.borderWidth,
          borderTopColor: borderTop ? borderColor : THEME.gridBorder,
          borderBottomColor: borderBottom ? borderColor : THEME.gridBorder,
          borderLeftColor: borderLeft ? borderColor : THEME.gridBorder,
          borderRightColor: borderRight ? borderColor : THEME.gridBorder,
        },
      ]}
    >
      {cell.state === CellState.QUEEN && (
        <Text style={styles.queenText}>👑</Text>
      )}
      {cell.state === CellState.ELIMINATED && (
        <Text
          style={[
            styles.eliminatedText,
            cell.isAutoEliminated && styles.autoEliminatedText,
          ]}
        >
          ✕
        </Text>
      )}
    </AnimatedPressable>
  );
}

export const CellView = React.memo(CellViewInner);

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  queenText: {
    fontSize: 22,
    textAlign: 'center',
  },
  eliminatedText: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.textOnRegion,
    opacity: 0.6,
    textAlign: 'center',
  },
  autoEliminatedText: {
    opacity: 0.3,
  },
});
