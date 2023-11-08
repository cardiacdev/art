"use client";

import { env } from "@/env.mjs";
import { clientsKeys } from "@/hooks/queries/clients/clients-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleClientResponse } from "@/types/clients";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { EditClientFormValues } from "@/components/clients/id/edit-client-dialog";

export const useEditClientMutation = (iri: string) => {
  const queryClient = useQueryClient();
  const { violations, resetViolations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: Partial<EditClientFormValues>) => {
      const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      });
      processResponse(res);
      if (!isSingleClientResponse(res)) throw new Error("Invalid response");

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientsKeys.all,
      });
    },
  });

  return {
    ...mutationReturnValue,
    violations,
    resetViolations,
  };
};
