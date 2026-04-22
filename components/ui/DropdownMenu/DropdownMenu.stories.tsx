import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";
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
} from ".";
import {
  STAKE_COLORS,
  RARITY_COLORS,
  type ButtonColor,
} from "@/config/buttonColors";
import { useState } from "react";
import { UserIcon, SettingsIcon, LogOutIcon } from "lucide-react";

const BUTTON_VARIANTS = [
  "default",
  "outline",
  "ghost",
  "secondary",
  "link",
] as const;
const COLOR_OPTIONS = [
  undefined,
  "stake-gold",
  "stake-blue",
  "stake-purple",
  "stake-orange",
  "stake-red",
  "stake-green",
  "stake-black",
  "stake-white",
  "rarity-common",
  "rarity-uncommon",
  "rarity-rare",
  "rarity-legendary",
] as const;

type PlaygroundArgs = {
  triggerVariant: (typeof BUTTON_VARIANTS)[number];
  triggerColor: (typeof COLOR_OPTIONS)[number];
  menuColor: (typeof COLOR_OPTIONS)[number];
};

const meta: Meta<PlaygroundArgs> = {
  title: "UI/DropdownMenu",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
  argTypes: {
    triggerVariant: { control: "select", options: BUTTON_VARIANTS },
    triggerColor: { control: "select", options: COLOR_OPTIONS },
    menuColor: { control: "select", options: COLOR_OPTIONS },
  },
  args: {
    triggerVariant: "outline",
    triggerColor: undefined,
    menuColor: "stake-gold",
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  render: ({ triggerVariant, triggerColor, menuColor }) => (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant={triggerVariant} color={triggerColor} />}
      >
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent color={menuColor}>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

const COLOR_GROUPS = [
  { label: "Stake", colors: STAKE_COLORS },
  { label: "Rarity", colors: RARITY_COLORS },
] as const;

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {/* Header row */}
      <div className="flex items-center gap-4">
        <span className="w-28 shrink-0" />
        {BUTTON_VARIANTS.map((v) => (
          <span
            key={v}
            className="w-24 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500"
          >
            {v}
          </span>
        ))}
      </div>

      {COLOR_GROUPS.map(({ label, colors }) => (
        <div key={label} className="flex flex-col gap-3">
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            {label}
          </p>
          {colors.map((color) => (
            <div key={color} className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-[10px] font-mono text-zinc-600">
                {color.replace(/^(stake|rarity)-/, "")}
              </span>
              {BUTTON_VARIANTS.map((variant) => (
                <div key={variant} className="w-24 flex justify-center">
                  <ColorSwatch color={color} variant={variant} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

const ColorSwatch = ({
  color,
  variant,
}: {
  color: ButtonColor;
  variant: (typeof BUTTON_VARIANTS)[number];
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button variant={variant} color={color} size="sm" className="w-24" />
      }
    >
      {color.replace(/^(stake|rarity)-/, "")}
    </DropdownMenuTrigger>
    <DropdownMenuContent color={color}>
      <DropdownMenuItem>Action one</DropdownMenuItem>
      <DropdownMenuItem>Action two</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Destructive</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        player@example.com
      </DropdownMenuTrigger>
      <DropdownMenuContent color="stake-gold" align="end">
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
      <DropdownMenuContent color="stake-blue">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
          <DropdownMenuSubContent color="stake-blue">
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
        <DropdownMenuContent color="stake-gold">
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
    const [stake, setStake] = useState("gold");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          Filter by stake
        </DropdownMenuTrigger>
        <DropdownMenuContent color="stake-gold">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Minimum stake</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={stake} onValueChange={setStake}>
              {[
                "white",
                "red",
                "green",
                "black",
                "blue",
                "purple",
                "orange",
                "gold",
              ].map((s) => (
                <DropdownMenuRadioItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
