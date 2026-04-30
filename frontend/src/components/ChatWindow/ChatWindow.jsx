import { useState } from 'react';
import { Conversation } from '../Conversation/Conversation.jsx';
import { ChatInput } from '../ChatInput/ChatInput.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';
const TIMESTAMP_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
});

const initialMessages = [
  {
    id: 2,
    sender: 'bot',
    text: "Hi, I'm Shubham. Ask me anything you would like to know about my LinkedIn profile.",
    timestamp: '',
  },
];

const createMessage = (sender, text) => ({
  id: crypto.randomUUID(),
  sender,
  text,
  timestamp: TIMESTAMP_FORMATTER.format(new Date()),
});

export function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (messageText) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage('user', trimmedMessage),
    ]);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        try {
          const errorPayload = await response.json();
          if (typeof errorPayload?.detail === 'string' && errorPayload.detail.trim()) {
            errorMessage = errorPayload.detail;
          }
        } catch {
          // Response body may not be JSON; keep default message.
        }
        throw new Error(errorMessage);
      }

      const payload = await response.json();
      const botReply = (payload.response ?? '').trim();

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          'bot',
          botReply || "I couldn't find an answer for that in the portfolio data.",
        ),
      ]);
    } catch (error) {
      console.error('Failed to fetch chat response:', error);
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          'bot',
          error instanceof Error
            ? `Sorry, I hit an error: ${error.message}`
            : 'Sorry, I hit an unexpected error. Please try again.',
        ),
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="chat-window" aria-label="LinkedIn profile bot chat">
      <header className="chat-header">LINKEDIN-IN PROFILE BOT</header>
      <div className="conversation-panel">
        <Conversation messages={messages} />
        <div className="typing-area" aria-live="polite">
          {isTyping && (
            <div className="typing-indicator" aria-label="Bot is typing">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
      </div>
      <ChatInput onSend={handleSend} />
    </section>
  );
}
