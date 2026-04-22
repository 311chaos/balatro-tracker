import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".";

const meta: Meta = {
  title: "UI/Dialog",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#09090b" }],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            This is a description of what this dialog is for. It provides
            context before the user takes an action.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            Are you sure you want to do this? This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button color="rarity-legendary">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="border-stake-gold text-stake-gold"
          />
        }
      >
        Sign in
      </DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-50 text-2xl">
            Sync your progress
          </DialogTitle>
          <DialogDescription className="text-zinc-50">
            Sign in to track your gold sticker collection across every device.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted");
          }}
          className="flex flex-col gap-3 pt-2"
        >
          <Input
            type="email"
            name="email"
            placeholder="balatro@example.com"
            size="lg"
          />
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            className="w-full bg-stake-gold text-black"
          >
            Send magic link
          </Button>
          <p className="text-center text-xs text-zinc-300">
            No password needed — we'll email you a one-time sign-in link.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No close button</DialogTitle>
          <DialogDescription>
            This dialog has no X button — it must be dismissed via an action or
            by clicking the backdrop.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button color="stake-gold">Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
