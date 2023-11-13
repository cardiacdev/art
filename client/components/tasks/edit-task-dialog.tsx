"use client";

import { useMemo } from "react";

import { useCreateTaskMutation } from "@/hooks/mutations/tasks/use-create-task-mutation";
import { useEditTaskMutation } from "@/hooks/mutations/tasks/use-edit-task-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

import { TaskMember } from "@/types/tasks";
import { cn, commaToDot } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Calendar } from "../ui/calendar";
import { CurrencyPopover } from "../ui/currency-popover";
import {
  Form,
  FormControl,
  FormDescription,
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

const editTaskFormSchema = z.object({
  title: z.string().min(2, "Der Taskname muss mindestens 2 Zeichen lang sein"),
  reference: z.union([z.string().min(1), z.literal("")]),
  euroAmount: z.union([z.string().min(1), z.literal("")]),
  externalHours: z.union([z.string().min(1), z.literal("")]),
  remarks: z.union([z.string().min(1), z.literal("")]),
  plannedCompletionDate: z.date().optional(),
  firstSandboxDeploymentDate: z.date().optional(),
  firstLiveDeploymentDate: z.date().optional(),
});

export type EditTaskFormValues = z.infer<typeof editTaskFormSchema>;

interface EditTaskDialogProps {
  projectId: string;
  task: TaskMember;
}

export const EditTaskDialog = NiceModal.create(({ projectId, task }: EditTaskDialogProps) => {
  const stateValues = useMemo(() => {
    return {
      title: task.title,
      reference: task.reference ?? "",
      euroAmount: task.euroAmount ?? "",
      externalHours: task.externalHours ?? "",
      remarks: task.remarks ?? "",
      plannedCompletionDate: task.plannedCompletionDate ? parseISO(task.plannedCompletionDate) : undefined,
      firstSandboxDeploymentDate: task.firstSandboxDeploymentDate
        ? parseISO(task.firstSandboxDeploymentDate)
        : undefined,
      firstLiveDeploymentDate: task.firstLiveDeploymentDate
        ? parseISO(task.firstLiveDeploymentDate)
        : undefined,
    };
  }, [task]);

  const form = useZodForm({
    schema: editTaskFormSchema,
    defaultValues: stateValues,
    values: stateValues,
  });

  const { mutate, isPending, violations } = useEditTaskMutation(task["@id"]);
  const { visible, show, hide } = useModal();

  const hideAndReset = () => {
    hide();
    form.reset(stateValues);
  };

  const onSubmit = (data: EditTaskFormValues) => {
    const postData = {
      ...data,
      euroAmount: data.euroAmount === "" ? "" : commaToDot(data.euroAmount),
      externalHours: data.externalHours === "" ? "" : commaToDot(data.externalHours),
    };
    mutate(postData, {
      onSuccess: (returnData) => {
        hideAndReset();
        toast.success(`Task ${returnData.title} erfolgreich bearbeitet!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : hideAndReset())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task bearbeiten</DialogTitle>
          <DialogDescription>Bearbeiten Sie die Taskdaten.</DialogDescription>
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
                          {field.value ? format(field.value, "PPP") : <span>Datum auswählen..</span>}
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
              name="firstSandboxDeploymentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Erstes Sandbox Deployment</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}>
                          {field.value ? format(field.value, "PPP") : <span>Datum auswählen..</span>}
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
              name="firstLiveDeploymentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Erstes Live Deployment</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}>
                          {field.value ? format(field.value, "PPP") : <span>Datum auswählen..</span>}
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
