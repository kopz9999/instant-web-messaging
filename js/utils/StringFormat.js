export function cutString(originalString, maxSize, suffix) {
  let finalString = originalString;
  if (finalString && finalString.length > maxSize) {
    finalString = finalString.substring(0, maxSize) + suffix;
  }
  return finalString;
}
