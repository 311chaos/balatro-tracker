import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '.';

const BUTTON_VARIANTS = [
  'default',
  'outline',
  'ghost',
  'secondary',
  'link',
] as const;

const STAKES = [
  'White',
  'Red',
  'Green',
  'Black',
  'Blue',
  'Purple',
  'Orange',
  'Gold',
] as const;

const meta: Meta = {
  title: 'Base Components/DropdownMenu',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        player@example.com
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Sign out
          <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Export data</DropdownMenuItem>
            <DropdownMenuItem>Import data</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          Delete account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [jokers, setJokers] = useState(true);
    const [tarots, setTarots] = useState(false);
    const [vouchers, setVouchers] = useState(true);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          Filter categories
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Show categories</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={jokers}
              onCheckedChange={setJokers}
            >
              Jokers
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={tarots}
              onCheckedChange={setTarots}
            >
              Tarots
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={vouchers}
              onCheckedChange={setVouchers}
            >
              Vouchers
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioItems: Story = {
  render: () => {
    const [stake, setStake] = useState('Gold');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          Filter by stake
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Minimum stake</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={stake} onValueChange={setStake}>
              {STAKES.map((s) => (
                <DropdownMenuRadioItem key={s} value={s}>
                  {s}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const TriggerVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {BUTTON_VARIANTS.map((variant) => (
        <DropdownMenu key={variant}>
          <DropdownMenuTrigger render={<Button variant={variant} />}>
            {variant}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Action one</DropdownMenuItem>
            <DropdownMenuItem>Action two</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Destructive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  ),
};
