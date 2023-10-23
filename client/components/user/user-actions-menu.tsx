import { useState } from "react";

import { DotsHorizontalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

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
import { DeleteUserDialog } from "./delete-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";

interface UserActionsMenuProps {
  user: UserMember;
}

export const UserActionsMenu = ({ user }: UserActionsMenuProps) => {
  const [action, setAction] = useState<"edit" | "delete" | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Menü öffnen</span>
            <DotsHorizontalIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onSelect={() => setAction("edit")}>
            <Pencil1Icon className="mr-1 h-4 w-4" />
            Bearbeiten
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-red-600" onSelect={() => setAction("delete")}>
            <TrashIcon className="mr-1 h-4 w-4" />
            Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {action === "edit" && <EditUserDialog user={user} reset={() => setAction(null)} />}
      {action === "delete" && <DeleteUserDialog user={user} reset={() => setAction(null)} />}
    </>
  );
};
