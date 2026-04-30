export function BotAvatar() {
  return (
    <span className="avatar avatar-bot" aria-hidden="true">
      <svg className="bot-assistant-icon" viewBox="0 0 64 64" focusable="false">
        <circle className="assistant-badge" cx="32" cy="32" r="30" />
        <path className="assistant-antenna" d="M32 20V10" />
        <circle className="assistant-antenna-dot" cx="32" cy="9" r="4" />
        <circle className="assistant-ear" cx="12" cy="34" r="6" />
        <circle className="assistant-ear" cx="52" cy="34" r="6" />
        <path
          className="assistant-shell"
          d="M20 21h24c8 0 14 6 14 14v3c0 8-6 14-14 14h-9l-13 8v-8h-2c-8 0-14-6-14-14v-3c0-8 6-14 14-14Z"
        />
        <rect className="assistant-face" x="18" y="28" width="28" height="16" rx="8" />
        <circle className="assistant-eye" cx="27" cy="36" r="3.3" />
        <circle className="assistant-eye" cx="37" cy="36" r="3.3" />
        <path className="assistant-shine" d="M20 25c3-4 8-6 14-6h8c3 0 6 1 8 2" />
      </svg>
    </span>
  );
}
