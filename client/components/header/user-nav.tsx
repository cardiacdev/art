import { useLogoutMutation } from "@/hooks/mutations/auth/use-logout-mutation";
import { useModal } from "@ebay/nice-modal-react";
import Avatar from "boring-avatars";

import { MeResponse } from "@/types/users";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditMeDialog } from "../users/edit-me-dialog";

interface UserNavProps {
  user: MeResponse;
}

export const UserNav = ({ user }: UserNavProps) => {
  const { mutate } = useLogoutMutation();
  const modal = useModal(EditMeDialog, { user });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Avatar size={25} name={user.username} variant="marble" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => modal.show({ user })}>
            Einstellungen
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => mutate()}>
            Abmelden
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
