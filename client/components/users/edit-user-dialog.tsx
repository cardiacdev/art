import { useEditUserMutation } from "@/hooks/mutations/users/use-edit-user-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";
import { z } from "zod";

import { UserMember } from "@/types/users";
import { getDirtyFormValues } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormServerMessage,
} from "../ui/form";
import { GlobalViolationAlerts } from "../ui/global-violation-alerts";

const editUserFormSchema = z.object({
  email: z.string().email("Ungültige Email-Adresse"),
  username: z.string().min(3, "Der Username muss mindestens 3 Zeichen lang sein"),
});

export type EditUserFormValues = z.infer<typeof editUserFormSchema>;

interface EditUserDialogProps {
  user: UserMember;
}

export const EditUserDialog = NiceModal.create(({ user }: EditUserDialogProps) => {
  const stateValues = {
    email: user.email,
    username: user.username,
  };
  const form = useZodForm({
    schema: editUserFormSchema,
    defaultValues: stateValues,
    values: stateValues,
  });

  /**
   * formState is wrapped with a Proxy to improve render performance
   * and skip extra logic if specific state is not subscribed to.
   * By reading all the values we need, we can properly subscribe to changes.
   * See: https://react-hook-form.com/docs/useform/formstate
   */
  const { isDirty, dirtyFields } = form.formState;

  const { mutate, isPending, violations, resetViolations } = useEditUserMutation(user["@id"]);
  const { visible, show, hide } = useModal();

  const resetDialog = () => {
    hide();
    form.reset(stateValues);
    resetViolations();
  };

  const onSubmit = (data: EditUserFormValues) => {
    if (!isDirty) {
      hide();
      return;
    }

    const patchData = getDirtyFormValues(dirtyFields, data);

    mutate(patchData, {
      onSuccess: () => {
        hide();
        toast.success(`Benutzer ${user.username} erfolgreich bearbeitet!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : resetDialog())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Benutzer bearbeiten</DialogTitle>
          <DialogDescription>Bearbeiten Sie die Daten des Benutzers.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormServerMessage violations={violations[field.name]} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormServerMessage violations={violations[field.name]} />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Speichern
            </Button>
            <GlobalViolationAlerts violations={violations.global} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
