"use client";

import { useCreateProjectMutation } from "@/hooks/mutations/projects/use-create-project-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";
import { z } from "zod";

import { commaToDot } from "@/lib/utils";
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
import { ClientPopoverField } from "./client-popover-field";

const createProjectFormSchema = z.object({
  name: z.string().min(2, "Der Projektname muss mindestens 2 Zeichen lang sein"),
  client: z.string().min(1, "Der Kunde darf nicht leer sein"),
  hourlyRate: z.union([z.string().min(1), z.literal("")]),
});

export type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;

export const CreateProjectDialog = NiceModal.create(() => {
  const form = useZodForm({
    schema: createProjectFormSchema,
    defaultValues: { name: "", client: "", hourlyRate: "" },
  });

  const { mutate, isPending, violations } = useCreateProjectMutation();
  const { visible, show, hide } = useModal();

  const hideAndReset = () => {
    hide();
    form.reset({ name: "", client: "", hourlyRate: "" });
  };

  const onSubmit = (data: CreateProjectFormValues) => {
    const postData = {
      ...data,
      hourlyRate: data.hourlyRate === "" ? "" : commaToDot(data.hourlyRate),
    };
    mutate(postData, {
      onSuccess: (returnData) => {
        hideAndReset();
        toast.success(`Projekt ${returnData.name} erfolgreich erstellt!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : hideAndReset())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Projekt anlegen</DialogTitle>
          <DialogDescription>Erstellen Sie ein neues Projekt.</DialogDescription>
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
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Kunde
                    <RequiredAsterisk />
                  </FormLabel>
                  <ClientPopoverField field={field} setFormValue={form.setValue} />
                  <FormMessage />
                  <FormServerMessage violations={violations[field.name]} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stundensatz</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0.00" />
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
