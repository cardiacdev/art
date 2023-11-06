"use client";

import { useCreateUserMutation } from "@/hooks/mutations/users/use-create-user-mutation";
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

const createUserFormSchema = z.object({
  email: z.string().email("Ungültige Email-Adresse"),
  username: z.string().min(3, "Der Username muss mindestens 3 Zeichen lang sein"),
  password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein"),
});

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;

export const CreateUserDialog = NiceModal.create(() => {
  const form = useZodForm({
    schema: createUserFormSchema,
    defaultValues: { email: "", username: "", password: "" },
  });

  const { mutate, isPending, violations } = useCreateUserMutation();
  const { visible, show, hide } = useModal();

  const hideAndReset = () => {
    hide();
    form.reset({ email: "", username: "", password: "" });
  };

  const onSubmit = (data: CreateUserFormValues) => {
    mutate(data, {
      onSuccess: (returnData) => {
        hideAndReset();
        toast.success(`Benutzer ${returnData.username} erfolgreich erstellt!`);
      },
    });
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : hideAndReset())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Benutzer anlegen</DialogTitle>
          <DialogDescription>Erstellen Sie einen neuen Benutzer.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Passwort
                    <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
