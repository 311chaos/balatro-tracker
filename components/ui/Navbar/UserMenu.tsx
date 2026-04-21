"use client";

import { useTransition } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            size="lg"
            className="gap-1.5 text-zinc-100 hover:text-black hover:bg-stake-gold active:bg-stake-gold data-popup-open:bg-stake-gold data-popup-open:text-black text-base"
          />
        }
      >
        {email}
        <ChevronDownIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            startTransition(() => {
              onSignOut();
            })
          }
          className="focus:bg-stake-gold focus:text-black"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
