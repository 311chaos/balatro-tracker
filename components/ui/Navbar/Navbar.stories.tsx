import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { SignInModal } from './SignInModal';
import { UserMenu } from './UserMenu';

const noop = () => {};

const NavbarShell = ({ children }: { children: React.ReactNode }) => (
  <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-3">
    <Link href="#" className="opacity-90 transition-opacity hover:opacity-100">
      <Logo size={64} />
    </Link>
    {children}
  </header>
);

const meta: Meta = {
  title: 'Components/Navbar',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#09090b' }],
    },
  },
};

export default meta;
type Story = StoryObj;

export const SignedOut: Story = {
  render: () => (
    <NavbarShell>
      <SignInModal action={noop} />
    </NavbarShell>
  ),
};

export const SignedIn: Story = {
  render: () => (
    <NavbarShell>
      <UserMenu
        email="player@example.com"
        onSignOut={() => alert('signOutAction() would fire here')}
      />
    </NavbarShell>
  ),
};

export const SignInModalPlayground: Story = {
  render: () => (
    <NavbarShell>
      <SignInModal action={noop} />
    </NavbarShell>
  ),
};

export const UserMenuPlayground: Story = {
  render: () => (
    <NavbarShell>
      <UserMenu
        email="player@example.com"
        onSignOut={() => alert('signOutAction() would fire here')}
      />
    </NavbarShell>
  ),
};
