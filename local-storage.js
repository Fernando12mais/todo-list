export function setLocalStorageItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageItem(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
}
