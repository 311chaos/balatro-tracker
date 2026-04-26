'use client';

import { useTransition } from 'react';
import { UserIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

type Props = {
  email: string;
  onSignOut: () => void | Promise<void>;
};

export const UserMenu = ({ email, onSignOut }: Props) => {
  const [, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Account menu for ${email}`}
            className="w-auto px-2"
          />
        }
      >
        <UserIcon className="size-5" />
        <ChevronDownIcon className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled className="text-muted-foreground text-xs">
          {email}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            startTransition(() => {
              onSignOut();
            })
          }
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
