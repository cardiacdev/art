"use client";

import { MouseEventHandler, useCallback } from "react";

import { useDeleteClientMutation } from "@/hooks/mutations/clients/use-delete-client-mutation";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";

import { ClientMember } from "@/types/clients";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { GlobalViolationAlerts } from "@/components/ui/global-violation-alerts";

interface DeleteClientDialogProps {
  client: ClientMember;
}

export const DeleteClientDialog = NiceModal.create(({ client }: DeleteClientDialogProps) => {
  const { visible, show, hide } = useModal();
  const { mutate, violations } = useDeleteClientMutation(client["@id"]);

  const handleDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();
      mutate(undefined, {
        onSuccess: () => {
          hide();
          toast.success(`Kunde ${client.name} erfolgreich gelöscht`);
        },
      });
    },
    [client, mutate, hide],
  );

  return (
    <AlertDialog open={visible} onOpenChange={(open) => (open ? show() : hide())}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sind Sie Sicher dass Sie diesen Kunden löschen wollen?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="mb-2 block">Diese Aktion kann nicht rückgängig gemacht werden.</span>
            <span>
              Projekt <strong>{client.name}</strong> wird unwiderruflich gelöscht.
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
        </AlertDialogFooter>
        <GlobalViolationAlerts violations={violations.global} />
      </AlertDialogContent>
    </AlertDialog>
  );
});
