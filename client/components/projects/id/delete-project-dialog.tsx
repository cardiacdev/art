"use client";

import { MouseEventHandler, useCallback } from "react";

import { useDeleteProjectMutation } from "@/hooks/mutations/projects/use-delete-project-mutation";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";

import { ProjectMember } from "@/types/projects";
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

interface DeleteProjectDialogProps {
  project: ProjectMember;
}

export const DeleteProjectDialog = NiceModal.create(({ project }: DeleteProjectDialogProps) => {
  const { visible, show, hide } = useModal();
  const { mutate, violations, resetViolations } = useDeleteProjectMutation(project["@id"]);

  const handleDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();
      mutate(undefined, {
        onSuccess: () => {
          hide();
          toast.success(`Projekt ${project.name} erfolgreich gelöscht`);
        },
      });
    },
    [project, mutate, hide],
  );

  const resetDialog = useCallback(() => {
    hide();
    resetViolations();
  }, [hide, resetViolations]);

  return (
    <AlertDialog open={visible} onOpenChange={(open) => (open ? show() : resetDialog())}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sind Sie Sicher dass Sie dieses Projekt löschen wollen?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="mb-2 block">Diese Aktion kann nicht rückgängig gemacht werden.</span>
            <span>
              Projekt <strong>{project.name}</strong> wird unwiderruflich gelöscht.
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
