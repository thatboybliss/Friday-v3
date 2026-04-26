# FridayAI Mobile App — Design Documentation

## Overview

FridayAI is a voice-first mobile AI assistant designed for seamless, hands-free interaction. The app prioritizes audio communication with a clean, minimal interface that supports both voice and text input. The design follows Apple Human Interface Guidelines (HIG) and is optimized for one-handed mobile usage in portrait orientation.

---

## Screen List

1. **Home Screen (Conversation View)**
   - Primary interface for voice and text interaction
   - Displays conversation history with chat bubbles
   - Voice interaction button at the bottom
   - Status indicators for listening/thinking/speaking states

2. **Settings Screen** (Future expansion)
   - User preferences, voice settings, app configuration

---

## Primary Content and Functionality

### Home Screen (Conversation View)

**Content:**
- **Chat Bubble Area**: Scrollable conversation history
  - User messages: Right-aligned, light background, minimal styling
  - AI responses: Left-aligned, soft glow effect, distinct visual treatment
  - Timestamps: Subtle, optional, shown on hover or tap
  - Message spacing: Human pacing with breathing room between exchanges

- **Voice Interaction Button**: Circular, centered at bottom
  - Primary action: Push-to-talk microphone
  - Visual feedback: Animated waveform during listening/speaking
  - Status text: "Idle", "Listening…", "Thinking…", "Speaking…"
  - Neon cyan glow when active

- **Status Indicator**: Above the mic button
  - Real-time status display
  - Smooth transitions between states

---

## Key User Flows

### Primary Flow: Voice Interaction

1. **User taps mic button** → Button enters "Listening" state with animated waveform
2. **User speaks** → Transcript appears in real-time (optional)
3. **User releases button** → Status changes to "Thinking…", waveform stops
4. **AI processes** → Status shows "Speaking…", AI response appears in chat
5. **AI finishes** → Status returns to "Idle", button ready for next interaction

### Secondary Flow: Text Input (Future)

1. **User taps text input field** → Keyboard appears
2. **User types message** → Message appears as user bubble
3. **AI responds** → Response appears as AI bubble with soft glow
4. **Conversation continues** → Scroll history as needed

---

## Color Choices

| Element | Color | Usage |
|---------|-------|-------|
| **Primary Accent** | Cyan (#00D9FF) | Mic button glow, AI message highlights, active states |
| **Background** | Dark Navy (#0A0E27) | Main screen background, creates contrast with glowing elements |
| **Surface** | Charcoal (#1A1F3A) | Chat bubble backgrounds, input areas |
| **User Message** | Light Gray (#E8E8E8) | User chat bubble text |
| **AI Message** | Cyan (#00D9FF) | AI response text with soft glow |
| **Muted Text** | Medium Gray (#8A8A8A) | Timestamps, secondary information |
| **Status Text** | Cyan (#00D9FF) | Status indicator text |

---

## Typography

- **Primary Font**: System font (SF Pro Display on iOS, Roboto on Android)
- **Message Text**: 16px, regular weight
- **Timestamps**: 12px, muted color
- **Status Text**: 14px, medium weight, cyan color
- **Line Height**: 1.5x for readability

---

## Visual Style

- **Minimalist aesthetic**: Clean lines, no unnecessary decoration
- **Soft glow effects**: AI messages feature a subtle cyan glow
- **Smooth animations**: Transitions between states are fluid (200-300ms)
- **Dark theme**: Reduces eye strain, emphasizes glowing elements
- **Circular mic button**: Modern, approachable design
- **Animated waveform**: Visual feedback during listening/speaking

---

## Interaction Design

### Mic Button States

| State | Visual | Behavior |
|-------|--------|----------|
| **Idle** | Solid cyan circle, no glow | Ready for tap |
| **Listening** | Animated waveform inside, bright glow | Real-time audio input |
| **Thinking** | Pulsing animation, medium glow | Processing response |
| **Speaking** | Animated waveform, bright glow | AI speaking |

### Chat Bubbles

- **User Messages**: Right-aligned, light background, no glow
- **AI Messages**: Left-aligned, dark background, soft cyan glow
- **Spacing**: 12px between messages, 24px between exchanges
- **Tap to reveal**: Timestamps appear on tap (optional)

---

## Accessibility

- **Haptic Feedback**: Subtle haptics on mic button press
- **Voice Feedback**: Status text provides audio cues
- **Color Contrast**: All text meets WCAG AA standards
- **Touch Targets**: Mic button is 56px minimum (iOS HIG)
- **Screen Reader Support**: All interactive elements labeled

---

## Future Enhancements

- Text input option for accessibility
- Conversation history/sessions
- Voice settings (language, speed, accent)
- Dark/light theme toggle
- Emotion detection visualization
- Multi-turn conversation context
