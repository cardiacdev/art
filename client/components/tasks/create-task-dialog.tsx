"use client";

import { useCreateTaskMutation } from "@/hooks/mutations/tasks/use-create-task-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { z } from "zod";

import { cn, commaToDot, dateToFormat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Calendar } from "../ui/calendar";
import { CurrencyPopover } from "../ui/currency-popover";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RequiredAsterisk } from "../ui/required-asterisk";
import { Textarea } from "../ui/textarea";

const createTaskFormSchema = z.object({
  title: z.string().min(2, "Der Taskname muss mindestens 2 Zeichen lang sein"),
  reference: z.union([z.string().min(1), z.literal("")]),
  euroAmount: z.union([z.string().min(1), z.literal("")]),
  externalHours: z.union([z.string().min(1), z.literal("")]),
  remarks: z.union([z.string().min(1), z.literal("")]),
  orderConfirmationDate: z.date().optional(),
  plannedCompletionDate: z.date().optional(),
});

export type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

const emptyFormValues = {
  title: "",
  reference: "",
  euroAmount: "",
  externalHours: "",
  remarks: "",
  plannedCompletionDate: undefined,
};

interface CreateTaskDialogProps {
  projectId: string;
}

export const CreateTaskDialog = NiceModal.create(({ projectId }: CreateTaskDialogProps) => {
  const form = useZodForm({
    schema: createTaskFormSchema,
    defaultValues: emptyFormValues,
  });

  const { mutate, isPending, violations } = useCreateTaskMutation(projectId);
  const { visible, show, hide } = useModal();

  const hideAndReset = () => {
    hide();
    form.reset(emptyFormValues);
  };

  const onSubmit = (data: CreateTaskFormValues) => {
    const postData = {
      ...data,
      euroAmount: data.euroAmount === "" ? "" : commaToDot(data.euroAmount),
      externalHours: data.externalHours === "" ? "" : commaToDot(data.externalHours),
      project: `/api/projects/${projectId}`,
    };
    mutate(postData, {
      onSuccess: (returnData) => {
        hideAndReset();
        toast.success(`Task ${returnData.title} erfolgreich erstellt!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : hideAndReset())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task anlegen</DialogTitle>
          <DialogDescription>Erstellen Sie einen neuen Task.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Titel
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
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <span>Referenz</span>
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
              name="euroAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <span>Betrag</span>
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
            <FormField
              control={form.control}
              name="externalHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <span>Stunden</span>
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
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <span>Bemerkungen</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormServerMessage violations={violations[field.name]} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderConfirmationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Bestelldatum</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}>
                          {field.value ? dateToFormat(field.value, "PPP") : <span>Datum auswählen..</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                  <FormServerMessage violations={violations[field.name]} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plannedCompletionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Geplante Fertigstellung</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}>
                          {field.value ? dateToFormat(field.value, "PPP") : <span>Datum auswählen..</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
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
