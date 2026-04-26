import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import type { Message } from '@/types';

interface ConversationViewProps {
  messages: Message[];
  showTimestamps?: boolean;
}

/**
 * ConversationView displays chat messages with AI/user distinction,
 * soft glow for AI responses, and smooth scrolling.
 */
export function ConversationView({
  messages,
  showTimestamps = false,
}: ConversationViewProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [expandedTimestamps, setExpandedTimestamps] = React.useState<Set<string>>(new Set());

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages.length]);

  const toggleTimestamp = (messageId: string) => {
    const newSet = new Set(expandedTimestamps);
    if (newSet.has(messageId)) {
      newSet.delete(messageId);
    } else {
      newSet.add(messageId);
    }
    setExpandedTimestamps(newSet);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  if (messages.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold text-foreground mb-2">
          Welcome to FridayAI
        </Text>
        <Text className="text-sm text-muted text-center leading-relaxed">
          Press and hold the microphone button to start a conversation.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1 px-4 py-4"
      contentContainerStyle={{ paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message, index) => {
        const isUser = message.role === 'user';
        const showTimestamp = expandedTimestamps.has(message.id) || showTimestamps;

        return (
          <View key={message.id} className={cn('mb-6', isUser ? 'items-end' : 'items-start')}>
            {/* Message bubble */}
            <Pressable
              onPress={() => toggleTimestamp(message.id)}
              className={cn(
                'max-w-xs rounded-2xl px-4 py-3',
                isUser
                  ? 'bg-surface border border-border'
                  : 'bg-surface border border-border relative'
              )}
              style={
                !isUser
                  ? {
                      shadowColor: '#00D9FF',
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 4,
                    }
                  : {}
              }
            >
              {/* Soft glow effect for AI messages (CSS-like shadow) */}
              {!isUser && (
                <View
                  className="absolute inset-0 rounded-2xl opacity-20 blur-lg"
                  style={{
                    backgroundColor: '#00D9FF',
                  }}
                />
              )}

              {/* Message text */}
              <Text
                className={cn(
                  'text-base leading-relaxed',
                  isUser ? 'text-foreground' : 'text-cyan-400'
                )}
              >
                {message.text}
              </Text>
            </Pressable>

            {/* Timestamp (shown on tap or if showTimestamps is true) */}
            {showTimestamp && (
              <Text className="text-xs text-muted mt-1 px-2">
                {formatTime(message.timestamp)} • {formatDate(message.timestamp)}
              </Text>
            )}

            {/* Spacing between messages */}
            {index < messages.length - 1 && (
              <View className="h-2" />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
