import { UserAvatar } from '../Avatars/UserAvatar.jsx';

export function UserMessage({ message }) {
  return (
    <article className="message-row message-row-user">
      <div className="message-bubble user-bubble">
        <UserAvatar />
        <span className="user-message-text">{message.text}</span>
      </div>
      {message.timestamp && <time className="timestamp">{message.timestamp}</time>}
    </article>
  );
}
