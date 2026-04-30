import { ChatWindow } from './components/ChatWindow/ChatWindow.jsx';

export default function App() {
  return (
    <main className="app-shell">
      <section className="chatbot-hero" aria-label="Chatbot assistant">
        <div className="chatbot-orbit" aria-hidden="true">
          <svg className="chatbot-mark" viewBox="0 0 240 210" focusable="false">
            <defs>
              <linearGradient id="botFaceGradient" x1="38" y1="20" x2="202" y2="190" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#07164f" />
                <stop offset="1" stopColor="#020920" />
              </linearGradient>
              <filter id="botGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path className="hero-bot-antenna" d="M120 31V12" />
            <circle className="hero-bot-dot" cx="120" cy="9" r="8" />
            <path
              className="hero-bot-shell"
              d="M70 42h100c25 0 45 20 45 45v16c0 25-20 45-45 45h-42l-50 29v-30h-8c-25 0-45-20-45-45V87c0-25 20-45 45-45Z"
            />
            <circle className="hero-bot-ear" cx="31" cy="95" r="18" />
            <circle className="hero-bot-ear" cx="209" cy="95" r="18" />
            <rect className="hero-bot-face" x="62" y="66" width="116" height="63" rx="29" />
            <circle className="hero-bot-eye" cx="95" cy="97" r="8" />
            <circle className="hero-bot-eye hero-bot-eye-right" cx="145" cy="97" r="8" />
          </svg>
        </div>
      </section>
      <ChatWindow />
    </main>
  );
}
