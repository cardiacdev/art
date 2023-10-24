"use client";

import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleUserResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { CreateUserFormValues } from "@/components/user/create-user-dialog";

async function createUser(data: CreateUserFormValues) {
  const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  const createdUser = await res.json();

  if (!isSingleUserResponse(createdUser)) throw new Error("Invalid response");

  return createdUser;
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserFormValues) => createUser(data),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: usersKeys.all,
      });
    },
  });
};
