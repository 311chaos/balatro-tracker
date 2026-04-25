"use client";

import { useTransition } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
type Props = {
  email: string;
  onSignOut: () => void | Promise<void>;
};

export const UserMenu = ({ email, onSignOut }: Props) => {
  const [, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="lg" />}
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
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
