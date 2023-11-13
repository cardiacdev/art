"use client";

import { MouseEventHandler, useCallback } from "react";

import { useDeleteTaskMutation } from "@/hooks/mutations/tasks/use-delete-task-mutation";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";

import { TaskMember } from "@/types/tasks";

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

interface DeleteTaskDialogProps {
  task: TaskMember;
}

export const DeleteTaskDialog = NiceModal.create(({ task }: DeleteTaskDialogProps) => {
  const { visible, show, hide } = useModal();
  const { mutate, violations, resetViolations } = useDeleteTaskMutation(task["@id"]);

  const handleDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    mutate(undefined, {
      onSuccess: () => {
        hide();
        toast.success(`Task ${task.title} erfolgreich gelöscht`);
      },
    });
  }, [task, mutate, hide]);

  const resetDialog = useCallback(() => {
    hide();
    resetViolations();
  }, [hide, resetViolations]);

  return (
    <AlertDialog open={visible} onOpenChange={(open) => (open ? show() : resetDialog())}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sind Sie Sicher dass Sie diesen Task löschen wollen?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="mb-2 block">Diese Aktion kann nicht rückgängig gemacht werden.</span>
            <span>
              Task <strong>{task.title}</strong> wird unwiderruflich gelöscht.
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
