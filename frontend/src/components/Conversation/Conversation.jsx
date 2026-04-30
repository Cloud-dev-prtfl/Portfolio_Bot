import { BotMessage } from '../Messages/BotMessage.jsx';
import { UserMessage } from '../Messages/UserMessage.jsx';

export function Conversation({ messages }) {
  return (
    <div className="conversation" role="log" aria-label="Chat conversation">
      {messages.map((message) =>
        message.sender === 'bot' ? (
          <BotMessage key={message.id} message={message} />
        ) : (
          <UserMessage key={message.id} message={message} />
        ),
      )}
    </div>
  );
}
