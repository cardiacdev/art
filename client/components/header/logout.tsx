"use client";

import { useLogoutMutation } from "@/hooks/mutations/auth/use-logout-mutation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Logout = () => {
  const { mutate } = useLogoutMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="outline">
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              mutate(undefined, {
                onSuccess: () => toast.success("Erfolgreich abgemeldet"),
                onError: () => toast.error("Fehler beim Abmelden"),
              })
            }>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
