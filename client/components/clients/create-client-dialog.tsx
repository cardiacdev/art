"use client";

import { useCreateClientMutation } from "@/hooks/mutations/clients/use-create-client-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";
import { z } from "zod";

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
import { RequiredAsterisk } from "../ui/required-asterisk";

const createClientFormSchema = z.object({
  name: z.string().min(2, "Der Kundenname muss mindestens 2 Zeichen lang sein"),
});

export type CreateClientFormValues = z.infer<typeof createClientFormSchema>;

export const CreateClientDialog = NiceModal.create(() => {
  const form = useZodForm({
    schema: createClientFormSchema,
    defaultValues: { name: "" },
  });

  const { mutate, isPending, violations } = useCreateClientMutation();
  const { visible, show, hide } = useModal();

  const hideAndReset = () => {
    hide();
    form.reset({ name: "" });
  };

  const onSubmit = (data: CreateClientFormValues) => {
    mutate(data, {
      onSuccess: (returnData) => {
        hideAndReset();
        toast.success(`Kunde ${returnData.name} erfolgreich erstellt!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : hideAndReset())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kunde anlegen</DialogTitle>
          <DialogDescription>Erstellen Sie einen neuen Kunden.</DialogDescription>
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
