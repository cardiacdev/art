"use client";

import { useEffect, useState } from "react";

import { useDeleteUserMutation } from "@/hooks/mutations/users/use-delete-user-mutation";
import { usePrevious } from "@/hooks/use-previous";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { UserMember } from "@/types/users";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { buttonVariants } from "../ui/button";

interface DeleteUserDialogWithButtonProps {
  user: UserMember;
  closeMenu: () => void;
}

export const DeleteUserDialogWithButton = ({ user, closeMenu }: DeleteUserDialogWithButtonProps) => {
  const { mutate } = useDeleteUserMutation(user["@id"]);

  const [isOpen, setIsOpen] = useState(false);
  const previous = usePrevious(isOpen);

  // Sync with parent menu
  useEffect(() => {
    if (!!previous && !isOpen) {
      closeMenu();
    }
  }, [isOpen, previous, closeMenu]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <div className="flex items-center" title="Benutzer löschen">
          <TrashIcon className="mr-1 h-4 w-4" />
          Löschen
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sind Sie Sicher dass Sie diesen Benutzer löschen wollen?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeMenu}>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              mutate(undefined, {
                onSuccess: () => toast.success(`Benutzer ${user.username} erfolgreich gelöscht`),
                onError: () => toast.error("Fehler beim Löschen des Benutzers"),
              });
              closeMenu();
            }}>
            Löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
