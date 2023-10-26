"use client";

import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleUserResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { CreateUserFormValues } from "@/components/user/create-user-dialog";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  const { violations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: CreateUserFormValues) => {
      const response = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      processResponse(response);

      if (!isSingleUserResponse(response)) throw new Error("Invalid response");

      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: usersKeys.all,
      });
    },
  });

  return {
    ...mutationReturnValue,
    violations,
  };
};
