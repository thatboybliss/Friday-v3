import { View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ConversationView } from '@/components/conversation-view';
import { VoiceInteraction } from '@/components/voice-interaction';
import { useConversation } from '@/hooks/use-conversation';
import { useEffect } from 'react';

/**
 * Home Screen - FridayAI Conversation Interface
 *
 * This screen displays:
 * - Conversation history with chat bubbles (ConversationView)
 * - Voice interaction button with animated waveform (VoiceInteraction)
 * - Real-time status indicators
 */
export default function HomeScreen() {
  const {
    state,
    handleStartListening,
    handleStopListening,
    setCurrentTranscript,
  } = useConversation();

  // Demo: Add a welcome message on first load
  useEffect(() => {
    if (state.messages.length === 0) {
      // Optionally add a welcome message here
      // For now, we'll keep it empty to match the design
    }
  }, []);

  return (
    <ScreenContainer className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Conversation View - Takes up remaining space */}
      <View className="flex-1">
        <ConversationView
          messages={state.messages}
          showTimestamps={false}
        />
      </View>

      {/* Voice Interaction - Fixed at bottom */}
      <View className="border-t border-border bg-background">
        <VoiceInteraction
          status={state.voiceStatus}
          onPressIn={handleStartListening}
          onPressOut={handleStopListening}
          isLoading={state.isLoading}
        />
      </View>
    </ScreenContainer>
  );
}
