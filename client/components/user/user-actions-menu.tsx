import { useState } from "react";

import { DotsHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";

import { UserMember } from "@/types/users";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeleteUserDialogWithButton } from "./delete-user-dialog-with-button";

interface UserActionsMenuProps {
  user: UserMember;
}

export const UserActionsMenu = ({ user }: UserActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Menü öffnen</span>
          <DotsHorizontalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Pencil1Icon className="mr-1 h-4 w-4" />
          Bearbeiten
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-600" onSelect={(e) => e.preventDefault()}>
          <DeleteUserDialogWithButton user={user} closeMenu={closeDialog} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
