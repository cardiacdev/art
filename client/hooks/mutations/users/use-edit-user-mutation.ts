"use client";

import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleUserResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { EditUserFormValues } from "@/components/user/edit-user-dialog";

export const useEditUserMutation = (iri: string) => {
  const queryClient = useQueryClient();
  const { violations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: Partial<EditUserFormValues>) => {
      const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      });
      processResponse(res);
      if (!isSingleUserResponse(res)) throw new Error("Invalid response");

      return res;
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
