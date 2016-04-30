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
