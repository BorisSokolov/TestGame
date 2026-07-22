/**
 * Queens Puzzle Game — HomeScreen
 *
 * Level selector with cards showing level info.
 * Minimalist, premium dark design.
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LEVELS } from '../constants/levels';
import { REGION_COLORS, THEME } from '../constants/colors';

interface HomeScreenProps {
  onSelectLevel: (levelId: string) => void;
}

export function HomeScreen({ onSelectLevel }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.crown}>👑</Text>
          <Text style={styles.title}>Queens</Text>
          <Text style={styles.subtitle}>A Logic Puzzle</Text>
        </View>

        {/* Rules Card */}
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>How to Play</Text>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleEmoji}>👑</Text>
            <Text style={styles.ruleText}>
              Place one Queen per row, column, and colored region
            </Text>
          </View>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleEmoji}>🚫</Text>
            <Text style={styles.ruleText}>
              Queens cannot touch each other — not even diagonally
            </Text>
          </View>
          <View style={styles.ruleRow}>
            <Text style={styles.ruleEmoji}>👆</Text>
            <Text style={styles.ruleText}>
              Tap once: X marker · Tap twice: Queen · Tap three: Clear
            </Text>
          </View>
        </View>

        {/* Level Cards */}
        <Text style={styles.sectionTitle}>Select Level</Text>
        {LEVELS.map((level, index) => (
          <Pressable
            key={level.id}
            style={({ pressed }) => [
              styles.levelCard,
              pressed && styles.levelCardPressed,
            ]}
            onPress={() => onSelectLevel(level.id)}
          >
            {/* Mini preview: color dots representing regions */}
            <View style={styles.previewContainer}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.colorDot,
                    { backgroundColor: REGION_COLORS[i] },
                  ]}
                />
              ))}
            </View>

            <View style={styles.levelInfo}>
              <Text style={styles.levelName}>{level.name}</Text>
              <Text style={styles.levelMeta}>
                {level.size}×{level.size} · Level {index + 1}
              </Text>
            </View>

            <Text style={styles.playArrow}>→</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 48,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  crown: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: THEME.textPrimary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.textSecondary,
    marginTop: 4,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  rulesCard: {
    backgroundColor: THEME.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  ruleEmoji: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: THEME.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
  },
  levelCardPressed: {
    backgroundColor: THEME.surfaceLight,
    transform: [{ scale: 0.98 }],
  },
  previewContainer: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 16,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.textPrimary,
  },
  levelMeta: {
    fontSize: 13,
    color: THEME.textSecondary,
    marginTop: 2,
  },
  playArrow: {
    fontSize: 24,
    color: THEME.accent,
    fontWeight: '700',
  },
});
