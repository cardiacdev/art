"use client";

import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

export const useDeleteUserMutation = (iri: string) => {
  const queryClient = useQueryClient();
  const { violations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async () => {
      const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
        method: "DELETE",
      });
      processResponse(res);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      }),
  });

  return {
    ...mutationReturnValue,
    violations,
  };
};
