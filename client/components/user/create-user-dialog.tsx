import { useCreateUserMutation } from "@/hooks/mutations/users/use-create-user-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

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
    mode: "onTouched",
  });
  const { isValid } = form.formState;

  const { mutate, isPending } = useCreateUserMutation();
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
      onError: (error) => {
        hideAndReset();
        toast.error(error.message, { duration: 7000 });
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passwort</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || !isValid}>
              Speichern
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
