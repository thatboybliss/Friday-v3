import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/lib/utils';
import type { VoiceStatus } from '@/types';

interface VoiceInteractionProps {
  status: VoiceStatus;
  onPressIn: () => void;
  onPressOut: () => void;
  isLoading?: boolean;
}

/**
 * VoiceInteraction component with push-to-talk mic button,
 * animated waveform, and status indicators.
 */
export function VoiceInteraction({
  status,
  onPressIn,
  onPressOut,
  isLoading = false,
}: VoiceInteractionProps) {
  const waveformAnimation = useSharedValue(0);
  const glowAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(0);

  // Waveform animation for listening/speaking states
  useEffect(() => {
    if (status === 'listening' || status === 'speaking') {
      waveformAnimation.value = withRepeat(
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      );
    } else {
      waveformAnimation.value = 0;
    }
  }, [status, waveformAnimation]);

  // Glow animation for active states
  useEffect(() => {
    if (status !== 'idle') {
      glowAnimation.value = withRepeat(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      );
    } else {
      glowAnimation.value = 0;
    }
  }, [status, glowAnimation]);

  // Pulse animation for thinking state
  useEffect(() => {
    if (status === 'thinking') {
      pulseAnimation.value = withRepeat(
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      );
    } else {
      pulseAnimation.value = 0;
    }
  }, [status, pulseAnimation]);

  // Animated styles for waveform bars
  const waveformAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      waveformAnimation.value,
      [0, 1],
      [0.4, 1],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scaleY: scale }],
    };
  });

  // Animated styles for glow effect
  const glowAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      glowAnimation.value,
      [0, 1],
      [0.3, 0.6],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

  // Animated styles for pulse effect (thinking state)
  const pulseAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pulseAnimation.value,
      [0, 1],
      [1, 1.2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  const getStatusText = () => {
    switch (status) {
      case 'listening':
        return 'Listening…';
      case 'thinking':
        return 'Thinking…';
      case 'speaking':
        return 'Speaking…';
      default:
        return 'Idle';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'listening':
      case 'speaking':
        return 'text-cyan-400';
      case 'thinking':
        return 'text-cyan-300';
      default:
        return 'text-muted';
    }
  };

  return (
    <View className="items-center gap-4 pb-6">
      {/* Status text */}
      <Text className={cn('text-sm font-medium', getStatusColor())}>
        {getStatusText()}
      </Text>

      {/* Mic button container */}
      <View className="relative items-center justify-center">
        {/* Outer glow ring (animated) */}
        {status !== 'idle' && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: '#00D9FF',
              },
              glowAnimatedStyle,
            ]}
          />
        )}

        {/* Pulse effect for thinking state */}
        {status === 'thinking' && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: 'rgba(0, 217, 255, 0.1)',
              },
              pulseAnimatedStyle,
            ]}
          />
        )}

        {/* Main mic button */}
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={isLoading}
          style={({ pressed }) => [
            {
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#00D9FF',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          {/* Waveform visualization inside button */}
          {(status === 'listening' || status === 'speaking') && (
            <View className="flex-row items-center justify-center gap-1 absolute">
              {[0, 1, 2].map((i) => (
                <Animated.View
                  key={i}
                  style={[
                    {
                      width: 3,
                      height: 20,
                      backgroundColor: '#0A0E27',
                      borderRadius: 2,
                      marginHorizontal: 2,
                    },
                    waveformAnimatedStyle,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Microphone icon (shown when idle or thinking) */}
          {(status === 'idle' || status === 'thinking') && (
            <Ionicons name="mic" size={28} color="#0A0E27" />
          )}
        </Pressable>

        {/* Subtle glow shadow behind button */}
        {status !== 'idle' && (
          <View
            style={{
              position: 'absolute',
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: '#00D9FF',
              opacity: 0.2,
              zIndex: -1,
            }}
          />
        )}
      </View>

      {/* Waveform bars below button (alternative visualization) */}
      {(status === 'listening' || status === 'speaking') && (
        <View className="flex-row items-center justify-center gap-1 h-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Animated.View
              key={i}
              style={[
                {
                  width: 3,
                  height: 20,
                  backgroundColor: '#00D9FF',
                  borderRadius: 2,
                  marginHorizontal: 2,
                },
                waveformAnimatedStyle,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
    paddingBottom: 24,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  micContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00D9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#00D9FF',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 32,
  },
  waveformBar: {
    width: 3,
    height: 20,
    backgroundColor: '#00D9FF',
    borderRadius: 2,
    marginHorizontal: 2,
  },
});
