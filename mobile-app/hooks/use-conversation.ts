import { useState, useCallback } from 'react';
import type { Message, VoiceStatus, ConversationState } from '@/types';

/**
 * Hook for managing conversation state and voice interaction
 */
export function useConversation() {
  const [state, setState] = useState<ConversationState>({
    messages: [],
    voiceStatus: 'idle',
    currentTranscript: '',
    isLoading: false,
    error: null,
  });

  const addMessage = useCallback((message: Message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }, []);

  const setVoiceStatus = useCallback((status: VoiceStatus) => {
    setState((prev) => ({
      ...prev,
      voiceStatus: status,
    }));
  }, []);

  const setCurrentTranscript = useCallback((transcript: string) => {
    setState((prev) => ({
      ...prev,
      currentTranscript: transcript,
    }));
  }, []);

  const setIsLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading,
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
    }));
  }, []);

  const clearMessages = useCallback(() => {
    setState((prev) => ({
      ...prev,
      messages: [],
    }));
  }, []);

  const handleStartListening = useCallback(() => {
    setVoiceStatus('listening');
    setCurrentTranscript('');
    setError(null);
  }, [setVoiceStatus, setCurrentTranscript, setError]);

  const handleStopListening = useCallback(() => {
    if (state.currentTranscript.trim()) {
      setVoiceStatus('thinking');
      // Here you would typically send the transcript to an AI service
      // For now, we'll just add it as a user message
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        text: state.currentTranscript,
        timestamp: new Date(),
      };
      addMessage(userMessage);

      // Simulate AI response after a delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          text: 'I received your message. How can I help?',
          timestamp: new Date(),
        };
        addMessage(aiMessage);
        setVoiceStatus('idle');
      }, 1500);
    } else {
      setVoiceStatus('idle');
    }
  }, [state.currentTranscript, setVoiceStatus, addMessage]);

  return {
    state,
    addMessage,
    setVoiceStatus,
    setCurrentTranscript,
    setIsLoading,
    setError,
    clearMessages,
    handleStartListening,
    handleStopListening,
  };
}
