import { beforeAll } from 'vitest';

// Set dark mode before any story mounts so the withDarkClass decorator
// initialises isDark = true via useState(readIsDark).
const STORAGE_KEY = 'sb-addon-themes-3';

beforeAll(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ current: 'dark' }));
  // Also set on <html> so portal-rendered content (dropdowns, dialogs) has a
  // .dark ancestor — the decorator only wraps the story in a div.
  document.documentElement.classList.add('dark');
});
