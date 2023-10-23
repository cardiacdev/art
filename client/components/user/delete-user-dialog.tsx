"use client";

import { useState } from "react";

import { useDeleteUserMutation } from "@/hooks/mutations/users/use-delete-user-mutation";
import { toast } from "sonner";

import { UserMember } from "@/types/users";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { buttonVariants } from "../ui/button";

interface DeleteUserDialogWithButtonProps {
  user: UserMember;
  reset: () => void;
}

export const DeleteUserDialog = ({ user, reset }: DeleteUserDialogWithButtonProps) => {
  const { mutate } = useDeleteUserMutation(user["@id"]);
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(!open);
    reset();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sind Sie Sicher dass Sie diesen Benutzer löschen wollen?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="mb-2 block">Diese Aktion kann nicht rückgängig gemacht werden.</span>
            <span>
              Benutzer <strong>{user.username}</strong> wird unwiderruflich gelöscht.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              mutate(undefined, {
                onSuccess: () => toast.success(`Benutzer ${user.username} erfolgreich gelöscht`),
                onError: () => toast.error("Fehler beim Löschen des Benutzers"),
              });
            }}>
            Löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
