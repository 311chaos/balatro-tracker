import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Balatro Tracker',
    brandImage: './icons/logo.svg',
    brandUrl: '/',
    brandTarget: '_self',
  }),
});
