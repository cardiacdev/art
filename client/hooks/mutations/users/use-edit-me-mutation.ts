"use client";

import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleUserResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { EditMeFormValues } from "@/components/users/edit-me-dialog";

export const useEditMeMutation = (iri: string) => {
  const queryClient = useQueryClient();
  const { violations, resetViolations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: Partial<EditMeFormValues>) => {
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
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: usersKeys.me,
      });
    },
  });

  return {
    ...mutationReturnValue,
    violations,
    resetViolations,
  };
};
