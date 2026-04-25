import { useEffect, useRef, useState } from 'react';
import type { Decorator } from '@storybook/nextjs-vite';
import { themes } from 'storybook/theming';
// @ts-expect-error — CSS side-effect imports
import '../app/globals.css';
// @ts-expect-error — CSS side-effect imports
import './fonts.css';

const STORAGE_KEY = 'sb-addon-themes-3';
const RELOAD_KEY = 'sb-dark-mode-reloaded';

const readIsDark = () => {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}').current === 'dark'
    );
  } catch {
    return false;
  }
};

// Record the dark mode state at load time so we can detect stale docs pages
if (typeof sessionStorage !== 'undefined') {
  sessionStorage.setItem(RELOAD_KEY, String(readIsDark()));
}

const withDarkClass: Decorator = (Story, context) => {
  const [isDark, setIsDark] = useState(readIsDark);

  // Sync dark state from storage events (manager → preview cross-iframe)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        setIsDark(JSON.parse(e.newValue ?? '{}').current === 'dark');
      } catch {}
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // On docs page mount: reload if dark mode changed since last load
  useEffect(() => {
    if (context.viewMode !== 'docs') return;
    const isDarkNow = readIsDark();
    if (sessionStorage.getItem(RELOAD_KEY) !== String(isDarkNow)) {
      sessionStorage.setItem(RELOAD_KEY, String(isDarkNow));
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While on docs: reload on toggle so docs.theme updates
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (context.viewMode === 'docs') {
      window.location.reload();
      return;
    }
  }, [isDark, context.viewMode]);

  // Apply canvas background and propagate dark class to <html> so that
  // portal-rendered content (dropdowns, dialogs) also receives dark variants.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.style.background = isDark ? '#09090b' : '';
  }, [isDark]);

  // Wrap in div with dark class — @custom-variant dark (&:is(.dark *)) requires
  // dark styles to be applied to descendants of .dark
  return (
    <div className={isDark ? 'dark' : ''}>
      <Story />
    </div>
  );
};

const preview = {
  decorators: [withDarkClass],
  darkMode: {
    dark: { class: 'dark' },
    light: {},
    classTarget: 'html',
  },
  parameters: {
    options: {
      storySort: (a, b) => {
        if (a.type === 'docs' && b.type !== 'docs') return -1;
        if (a.type !== 'docs' && b.type === 'docs') return 1;
        return 0;
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    docs: {
      theme: readIsDark() ? themes.dark : themes.light,
    },
  },
};

export default preview;
