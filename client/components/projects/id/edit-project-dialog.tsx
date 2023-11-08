"use client";

import { useEditProjectMutation } from "@/hooks/mutations/projects/use-edit-project-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";
import { z } from "zod";

import { ProjectMember } from "@/types/projects";
import { commaToDot, getDirtyFormValues } from "@/lib/utils";
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

import { ClientPopoverField } from "../client-popover-field";

const editProjectFormSchema = z.object({
  name: z.string().min(2, "Der Projektname muss mindestens 2 Zeichen lang sein"),
  client: z.string().min(1, "Der Kunde darf nicht leer sein"),
  hourlyRate: z.union([z.string().min(1), z.literal("")]),
});

export type EditProjectFormValues = z.infer<typeof editProjectFormSchema>;

interface EditProjectDialogProps {
  project: ProjectMember;
}

export const EditProjectDialog = NiceModal.create(({ project }: EditProjectDialogProps) => {
  const stateValues = {
    name: project.name,
    client: project.client["@id"],
    hourlyRate: project.hourlyRate ?? "",
  };
  const form = useZodForm({
    schema: editProjectFormSchema,
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

  const { mutate, isPending, violations, resetViolations } = useEditProjectMutation(project["@id"]);
  const { visible, show, hide } = useModal();

  const resetDialog = () => {
    hide();
    form.reset(stateValues);
    resetViolations();
  };

  const onSubmit = (data: EditProjectFormValues) => {
    if (!isDirty) {
      hide();
      return;
    }

    const patchData = getDirtyFormValues(dirtyFields, data);

    const sanitizedData = patchData.hourlyRate
      ? { ...patchData, hourlyRate: commaToDot(patchData.hourlyRate) }
      : patchData;

    mutate(sanitizedData, {
      onSuccess: () => {
        hide();
        toast.success(`Projekt ${project.name} erfolgreich bearbeitet!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : resetDialog())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Projekt bearbeiten</DialogTitle>
          <DialogDescription>Bearbeiten Sie die Projektdaten.</DialogDescription>
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
                  <FormLabel className="flex items-center gap-2">
                    <span>Stundensatz</span>
                    <CurrencyPopover />
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
