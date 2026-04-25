import { beforeAll } from 'vitest';

// Set dark mode before any story mounts so the withDarkClass decorator
// initialises isDark = true via useState(readIsDark).
const STORAGE_KEY = 'sb-addon-themes-3';

beforeAll(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ current: 'dark' }));
});
