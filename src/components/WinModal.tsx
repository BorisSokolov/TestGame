/**
 * Queens Puzzle Game — WinModal Component
 *
 * Celebratory overlay shown when the puzzle is solved.
 * Features:
 *   - Frosted glass overlay
 *   - Scale-in animation
 *   - Confetti-like emoji burst
 *   - Next Level and Replay buttons
 */

import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { THEME } from '../constants/colors';

interface WinModalProps {
  visible: boolean;
  levelName: string;
  onNextLevel: () => void;
  onReplay: () => void;
}

export function WinModal({
  visible,
  levelName,
  onNextLevel,
  onReplay,
}: WinModalProps) {
  const cardScale = useSharedValue(0);
  const crownScale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      cardScale.value = withSpring(1, { damping: 10, stiffness: 150 });
      crownScale.value = withDelay(
        200,
        withSequence(
          withSpring(1.3, { damping: 5, stiffness: 200 }),
          withSpring(1, { damping: 8, stiffness: 150 })
        )
      );
    } else {
      cardScale.value = withTiming(0, { duration: 150 });
      crownScale.value = withTiming(0, { duration: 150 });
    }
  }, [visible]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardScale.value,
  }));

  const crownAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: crownScale.value }],
  }));

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          {/* Crown */}
          <Animated.Text style={[styles.crown, crownAnimatedStyle]}>
            👑
          </Animated.Text>

          {/* Title */}
          <Text style={styles.title}>Brilliant!</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            You solved "{levelName}"
          </Text>

          {/* Decorative stars */}
          <Text style={styles.stars}>✨ 🌟 ✨</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <Pressable
              onPress={onReplay}
              style={[styles.button, styles.secondaryButton]}
            >
              <Text style={styles.secondaryButtonText}>↻ Replay</Text>
            </Pressable>

            <Pressable
              onPress={onNextLevel}
              style={[styles.button, styles.primaryButton]}
            >
              <Text style={styles.primaryButtonText}>Next Level →</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: THEME.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  card: {
    backgroundColor: THEME.surface,
    borderRadius: 24,
    padding: 36,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: THEME.queenColor + '40',
    // Shadow
    shadowColor: THEME.queenColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
  },
  crown: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: THEME.queenColor,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  stars: {
    fontSize: 24,
    marginBottom: 28,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: THEME.accent,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: THEME.surfaceLight,
    borderWidth: 1,
    borderColor: THEME.textSecondary + '40',
  },
  secondaryButtonText: {
    color: THEME.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
