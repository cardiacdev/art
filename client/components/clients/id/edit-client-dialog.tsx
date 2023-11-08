"use client";

import { useEditClientMutation } from "@/hooks/mutations/clients/use-edit-client-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";
import { z } from "zod";

import { ClientMember } from "@/types/clients";
import { ProjectMember } from "@/types/projects";
import { getDirtyFormValues } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CurrencyPopover } from "@/components/ui/currency-popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormServerMessage,
} from "@/components/ui/form";
import { GlobalViolationAlerts } from "@/components/ui/global-violation-alerts";
import { Input } from "@/components/ui/input";
import { RequiredAsterisk } from "@/components/ui/required-asterisk";

const editClientFormSchema = z.object({
  name: z.string().min(2, "Der Projektname muss mindestens 2 Zeichen lang sein"),
});

export type EditClientFormValues = z.infer<typeof editClientFormSchema>;

interface EditClientDialogProps {
  client: ClientMember;
}

export const EditClientDialog = NiceModal.create(({ client }: EditClientDialogProps) => {
  const stateValues = {
    name: client.name,
  };
  const form = useZodForm({
    schema: editClientFormSchema,
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

  const { mutate, isPending, violations, resetViolations } = useEditClientMutation(client["@id"]);
  const { visible, show, hide } = useModal();

  const resetDialog = () => {
    hide();
    form.reset(stateValues);
    resetViolations();
  };

  const onSubmit = (data: EditClientFormValues) => {
    if (!isDirty) {
      hide();
      return;
    }

    const patchData = getDirtyFormValues(dirtyFields, data);

    mutate(patchData, {
      onSuccess: () => {
        hide();
        toast.success(`Kunde ${client.name} erfolgreich bearbeitet!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : resetDialog())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kunde bearbeiten</DialogTitle>
          <DialogDescription>Bearbeiten Sie die Kundendaten.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                    <RequiredAsterisk />
                  </FormLabel>
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
