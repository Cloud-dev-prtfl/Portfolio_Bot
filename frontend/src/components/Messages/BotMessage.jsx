import { BotAvatar } from '../Avatars/BotAvatar.jsx';

export function BotMessage({ message }) {
  return (
    <article className="message-row message-row-bot">
      <div className="message-bubble bot-bubble bot-welcome-card">
        <span className="bot-card-shine" aria-hidden="true" />
        <BotAvatar />
        <div className="bot-message-copy">
          <span className="bot-message-text">{message.text}</span>
        </div>
      </div>
      {message.timestamp && <time className="timestamp">{message.timestamp}</time>}
    </article>
  );
}
