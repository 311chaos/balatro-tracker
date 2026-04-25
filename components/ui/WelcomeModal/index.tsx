'use client';

import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'balatro-welcome-seen';

const WelcomeModal = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      localStorage.setItem(STORAGE_KEY, '1');
    }
    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-zinc-900" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl text-zinc-50">
            Welcome to Balatro Tracker
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Track which jokers you&apos;ve earned a gold sticker on across every
            run.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-zinc-300">
            <span className="font-semibold text-zinc-100">
              No account needed.
            </span>{' '}
            Your progress is saved right in your browser — just start clicking.
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold text-zinc-100">
              Playing on multiple devices?
            </span>{' '}
            Sign in with your email and your gold stickers will follow you
            everywhere.
          </p>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="default" className="w-full" />}>
            Start tracking
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { WelcomeModal };
