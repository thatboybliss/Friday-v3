/**
 * Message type for conversation history
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

/**
 * Voice interaction status
 */
export type VoiceStatus = 'idle' | 'listening' | 'thinking' | 'speaking';

/**
 * Conversation state
 */
export interface ConversationState {
  messages: Message[];
  voiceStatus: VoiceStatus;
  currentTranscript: string;
  isLoading: boolean;
  error: string | null;
}
