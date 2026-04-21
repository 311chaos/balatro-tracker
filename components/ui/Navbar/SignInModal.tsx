"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
};

export const SignInModal = ({ action }: Props) => (
  <Dialog>
    <DialogTrigger
      render={
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 bg-black border-stake-gold text-stake-gold hover:text-black hover:bg-stake-gold active:bg-stake-gold data-popup-open:bg-stake-gold data-popup-open:text-black"
        />
      }
    >
      Sign in
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sync your progress</DialogTitle>
        <DialogDescription>
          Sign in to track your gold sticker collection across every device.
          Your progress is saved automatically every time you update a joker.
        </DialogDescription>
      </DialogHeader>
      <form action={action} className="flex flex-col gap-3 pt-2">
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          size="lg"
        />
        <Button type="submit" className="w-full">
          Send magic link
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          No password needed — we'll email you a one-time sign-in link.
        </p>
      </form>
    </DialogContent>
  </Dialog>
);
