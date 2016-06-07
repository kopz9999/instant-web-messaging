export function formatTimestamp(date) {
  var now = new Date();
  if (!date) return now.toLocaleDateString();
  if (date.toLocaleDateString() === now.toLocaleDateString()) {
    return date.toLocaleTimeString(navigator.language,
      {
        hour12: false,
        hour: '2-digit',
        minute:'2-digit'
      }
    );
  }
  else return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

export function timeSinceCompose(date) {
  return timeSince(date, 'ago');
}

export function timeSince(date, suffix) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ` Years ${suffix}`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ` Months ${suffix}`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ` Days ${suffix}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ` Hours ${suffix}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ` Minutes ${suffix}`;
  }
  if (seconds < 0) return 'Just now';
  else return Math.floor(seconds) + `s ${suffix}`;
}
