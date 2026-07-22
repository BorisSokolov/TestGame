/**
 * Queens Puzzle Game — Header Component
 *
 * Top bar with:
 *   - Level name
 *   - Queen counter (placed / total)
 *   - Reset button
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';
import { THEME } from '../constants/colors';

interface HeaderProps {
  onBack?: () => void;
}

export function Header({ onBack }: HeaderProps) {
  const { state, resetLevel } = useGame();
  const { level, queensPlaced } = state;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {onBack && (
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        )}
        <Text style={styles.title}>{level.name}</Text>
        <Pressable onPress={resetLevel} style={styles.resetButton}>
          <Text style={styles.resetText}>↻ Reset</Text>
        </Pressable>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.queenCounter}>
          <Text style={styles.queenEmoji}>👑</Text>
          <Text style={styles.counterText}>
            {queensPlaced} / {level.size}
          </Text>
        </View>
        <Text style={styles.sizeLabel}>
          {level.size}×{level.size}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  backText: {
    color: THEME.accentLight,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: THEME.textPrimary,
    letterSpacing: 0.5,
  },
  resetButton: {
    backgroundColor: THEME.surfaceLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.accent,
  },
  resetText: {
    color: THEME.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  queenCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: THEME.surface,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  queenEmoji: {
    fontSize: 18,
  },
  counterText: {
    color: THEME.queenColor,
    fontSize: 18,
    fontWeight: '700',
  },
  sizeLabel: {
    color: THEME.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
