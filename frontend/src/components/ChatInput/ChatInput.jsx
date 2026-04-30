import { useState } from 'react';

export function ChatInput({ onSend }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(inputValue);
    setInputValue('');
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        className="chat-input"
        type="text"
        placeholder="Write your message here"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        aria-label="Message"
      />
      <button className="send-button" type="submit" aria-label="Send message">
        <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
          <path d="M8.5 23.2 38.9 9.6c1.6-.7 3.2.9 2.5 2.5L27.8 42.5c-.7 1.7-3.2 1.5-3.7-.3l-2.9-10.7-10.8-4.4c-1.7-.7-1.7-3.1.1-3.9Z" />
          <path d="m22.1 30.6 9.8-10.4-13 7.4 2.1 1.2Z" />
        </svg>
      </button>
    </form>
  );
}
