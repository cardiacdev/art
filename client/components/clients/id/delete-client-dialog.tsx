"use client";

import { MouseEventHandler, useCallback } from "react";

import { useDeleteClientMutation } from "@/hooks/mutations/clients/use-delete-client-mutation";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";

import { ClientMember } from "@/types/clients";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  const { mutate, violations, resetViolations } = useDeleteClientMutation(client["@id"]);

  const hasInvoices = client.invoices.length > 0;
  const hasProjects = client.projects.length > 0;

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

  const resetDialog = useCallback(() => {
    hide();
    resetViolations();
  }, [hide, resetViolations]);

  return (
    <AlertDialog open={visible} onOpenChange={(open) => (open ? show() : resetDialog())}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sind Sie Sicher dass Sie diesen Kunden löschen wollen?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="mb-2 block">Diese Aktion kann nicht rückgängig gemacht werden.</span>
            <span>
              Kunde <strong>{client.name}</strong> wird unwiderruflich gelöscht.
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
        {(hasInvoices || hasProjects) && (
          <Alert variant={"destructive"} className="">
            <AlertDescription>
              {hasInvoices && (
                <p>
                  Der Kunde hat noch Rechnungen. Bitte löschen Sie diese zuerst bevor Sie den Kunden löschen.
                </p>
              )}
              {hasProjects && (
                <p>
                  Der Kunde hat noch Projekte. Bitte löschen Sie diese zuerst bevor Sie den Kunden löschen.
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
});
