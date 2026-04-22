import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import { SignInModal } from "./SignInModal";
import { UserMenu } from "./UserMenu";

const noop = () => {};

const NavbarShell = ({ children }: { children: React.ReactNode }) => (
  <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-3">
    <Link
      href="#"
      className="font-balatro text-2xl text-zinc-100 tracking-wide transition-colors hover:text-white"
    >
      Balatro Tracker
    </Link>
    {children}
  </header>
);

const meta: Meta = {
  title: "UI/Navbar",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
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
        onSignOut={() => alert("signOutAction() would fire here")}
      />
    </NavbarShell>
  ),
};

export const SignInModalPlayground: Story = {
  render: () => (
    <div className="flex justify-end p-6 bg-zinc-950 min-h-24">
      <SignInModal action={noop} />
    </div>
  ),
};

export const UserMenuPlayground: Story = {
  render: () => (
    <div className="flex justify-end p-6 bg-zinc-950 min-h-24">
      <UserMenu
        email="player@example.com"
        onSignOut={() => alert("signOutAction() would fire here")}
      />
    </div>
  ),
};
