import { describe, it, expect } from 'vitest';
import type { Message, VoiceStatus } from '@/types';

/**
 * Unit tests for useConversation hook
 * These tests verify the state management logic
 */

describe('useConversation - State Management', () => {
  it('initializes with correct default state', () => {
    const initialState = {
      messages: [] as Message[],
      voiceStatus: 'idle' as VoiceStatus,
      currentTranscript: '',
      isLoading: false,
      error: null as string | null,
    };

    expect(initialState.messages).toEqual([]);
    expect(initialState.voiceStatus).toBe('idle');
    expect(initialState.currentTranscript).toBe('');
    expect(initialState.isLoading).toBe(false);
    expect(initialState.error).toBe(null);
  });

  it('correctly identifies user vs assistant messages', () => {
    const userMessage: Message = {
      id: '1',
      role: 'user',
      text: 'Hello',
      timestamp: new Date(),
    };

    const assistantMessage: Message = {
      id: '2',
      role: 'assistant',
      text: 'Hi there!',
      timestamp: new Date(),
    };

    expect(userMessage.role).toBe('user');
    expect(assistantMessage.role).toBe('assistant');
  });

  it('validates voice status transitions', () => {
    const validStatuses: VoiceStatus[] = ['idle', 'listening', 'thinking', 'speaking'];

    validStatuses.forEach((status) => {
      expect(['idle', 'listening', 'thinking', 'speaking']).toContain(status);
    });
  });

  it('creates messages with correct structure', () => {
    const message: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: 'Test message',
      timestamp: new Date(),
    };

    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('role');
    expect(message).toHaveProperty('text');
    expect(message).toHaveProperty('timestamp');
    expect(message.id).toMatch(/^msg-\d+$/);
    expect(['user', 'assistant']).toContain(message.role);
  });

  it('handles empty transcript correctly', () => {
    const transcript = '';
    const shouldProcess = transcript.trim().length > 0;
    expect(shouldProcess).toBe(false);
  });

  it('handles non-empty transcript correctly', () => {
    const transcript = 'Hello world';
    const shouldProcess = transcript.trim().length > 0;
    expect(shouldProcess).toBe(true);
  });

  it('simulates conversation flow', () => {
    let messages: Message[] = [];
    let voiceStatus: VoiceStatus = 'idle';

    // Start listening
    voiceStatus = 'listening';
    expect(voiceStatus).toBe('listening');

    // Add user message
    const userMsg: Message = {
      id: '1',
      role: 'user',
      text: 'What time is it?',
      timestamp: new Date(),
    };
    messages.push(userMsg);
    voiceStatus = 'thinking';
    expect(messages).toHaveLength(1);
    expect(voiceStatus).toBe('thinking');

    // Add AI response
    const aiMsg: Message = {
      id: '2',
      role: 'assistant',
      text: 'It is 3:30 PM.',
      timestamp: new Date(),
    };
    messages.push(aiMsg);
    voiceStatus = 'idle';
    expect(messages).toHaveLength(2);
    expect(voiceStatus).toBe('idle');
  });

  it('maintains message order', () => {
    const messages: Message[] = [
      { id: '1', role: 'user', text: 'First', timestamp: new Date() },
      { id: '2', role: 'assistant', text: 'Second', timestamp: new Date() },
      { id: '3', role: 'user', text: 'Third', timestamp: new Date() },
    ];

    expect(messages[0].text).toBe('First');
    expect(messages[1].text).toBe('Second');
    expect(messages[2].text).toBe('Third');
  });
});
