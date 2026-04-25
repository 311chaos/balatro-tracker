'use client';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';

type Props = {
  action: (formData: FormData) => void | Promise<void>;
};

export const SignInModal = ({ action }: Props) => (
  <Dialog>
    <DialogTrigger render={<Button variant="outline" size="lg" />}>
      Sign in
    </DialogTrigger>
    <DialogContent className="bg-zinc-800">
      <DialogHeader>
        <DialogTitle className="text-2xl text-zinc-50">
          Sync your progress
        </DialogTitle>
        <DialogDescription className="text-zinc-50">
          Sign in to track your gold sticker collection across every device.
          Your progress is saved automatically every time you update a joker.
        </DialogDescription>
      </DialogHeader>
      <form action={action} className="flex flex-col gap-3 pt-2">
        <Input
          type="email"
          name="email"
          placeholder="balatro@example.com"
          required
          autoComplete="email"
          size="lg"
        />
        <Button type="submit" size="lg" className="w-full">
          Send magic link
        </Button>
        <p className="text-center text-xs text-zinc-300">
          No password needed — we'll email you a one-time sign-in link.
        </p>
      </form>
    </DialogContent>
  </Dialog>
);
