"use client";

import { env } from "@/env.mjs";
import { clientsKeys } from "@/hooks/queries/clients/clients-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleClientResponse } from "@/types/clients";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { CreateClientFormValues } from "@/components/clients/create-client-dialog";

export const useCreateClientMutation = () => {
  const queryClient = useQueryClient();

  const { violations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: CreateClientFormValues) => {
      const response = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/clients`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      processResponse(response);

      if (!isSingleClientResponse(response)) throw new Error("Invalid response");

      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: clientsKeys.all,
      });
    },
  });

  return {
    ...mutationReturnValue,
    violations,
  };
};
