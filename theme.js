export function setTheme(theme) {
  if (theme) {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
    return;
  }

  const storedTheme = localStorage.getItem("theme");

  if (storedTheme) {
    document.documentElement.className = storedTheme;
    return;
  }

  const isThemeLight = window.matchMedia(
    "(prefers-color-scheme:light)"
  ).matches;

  if (isThemeLight) {
    document.documentElement.className = "light";
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.className = "dark";
    localStorage.setItem("theme", "dark");
  }
}

export function getTheme() {
  return document.documentElement.className;
}
