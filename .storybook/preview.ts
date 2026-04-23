import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css'
import './fonts.css'
import { colors } from '../config/colors'

Object.entries(colors.rarity).forEach(([key, value]) =>
  document.documentElement.style.setProperty(`--rarity-${key}`, value)
);
Object.entries(colors.stake).forEach(([key, value]) =>
  document.documentElement.style.setProperty(`--stake-${key}`, value)
);

const preview: Preview = {
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
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error'
    }
  },
};

export default preview;