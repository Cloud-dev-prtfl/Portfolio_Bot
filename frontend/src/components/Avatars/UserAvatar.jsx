export function UserAvatar() {
  return (
    <span className="avatar avatar-user" aria-hidden="true">
      <svg className="user-profile-icon" viewBox="0 0 64 64" focusable="false">
        <circle className="user-icon-badge" cx="32" cy="32" r="30" />
        <circle className="user-icon-frame" cx="32" cy="32" r="22" />
        <circle className="user-icon-head" cx="32" cy="27" r="7" />
        <path className="user-icon-body" d="M19 48c2.8-8.4 7.2-12.6 13-12.6S42.2 39.6 45 48" />
        <path className="user-icon-tie" d="M29.8 36.5 32 40l2.2-3.5M32 40v5" />
      </svg>
    </span>
  );
}
