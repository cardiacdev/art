"use client";

import { env } from "@/env.mjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function logout() {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/logout`, {
    headers: {
      Credentials: "include",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Erfolgreich abgemeldet")
      queryClient.resetQueries();
    },
    onError: (error) => toast.error(error.message, { duration: 7000 }),
  });
};
