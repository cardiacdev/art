"use client";

import { useCallback } from "react";

import { useDeleteUserMutation } from "@/hooks/mutations/users/use-delete-user-mutation";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
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
import { GlobalViolationAlerts } from "../ui/global-violation-alerts";

interface DeleteUserDialogProps {
  user: UserMember;
}

export const DeleteUserDialog = NiceModal.create(({ user }: DeleteUserDialogProps) => {
  const { visible, show, hide } = useModal();
  const { mutate, violations } = useDeleteUserMutation(user["@id"]);

  const handleDeleteClick = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => toast.success(`Benutzer ${user.username} erfolgreich gelöscht`),
    });
  }, [user, mutate]);

  return (
    <AlertDialog open={visible} onOpenChange={(open) => (open ? show() : hide())}>
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
            onClick={handleDeleteClick}>
            Löschen
          </AlertDialogAction>
          <GlobalViolationAlerts violations={violations.global} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
