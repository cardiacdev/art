"use client";

import { useLoginMutation } from "@/hooks/mutations/auth/use-login-mutation";
import { useZodForm } from "@/hooks/use-zod-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Ungültige Email-Adresse"),
  password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein"),
});

interface LoginFormProps {
  closeDialog: () => void;
}

export const LoginForm = ({ closeDialog }: LoginFormProps) => {
  const form = useZodForm({ schema, defaultValues: { email: "", password: "" } });
  const { mutate, isPending } = useLoginMutation();

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate(data, {
      onSuccess: () => {
        closeDialog();
        toast.success("Login erfolgreich!");
      },
      onError: (error) => {
        closeDialog();
        toast.error(error.message, { duration: 7000 });
      },
    });
  };

  return (
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
              <button
                type="button"
                onClick={() => form.setValue(field.name, "admin@example.com")}
                className="text-xs text-muted-foreground">
                (try admin@example.com)
              </button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <button
                type="button"
                onClick={() => form.setValue(field.name, "123456")}
                className="text-xs text-muted-foreground">
                (try 123456)
              </button>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};
