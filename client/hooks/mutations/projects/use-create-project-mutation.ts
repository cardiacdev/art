"use client";

import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleProjectResponse } from "@/types/projects";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { CreateProjectFormValues } from "@/components/projects/create-project-dialog";

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  const { violations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: CreateProjectFormValues) => {
      const response = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/projects`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      processResponse(response);

      if (!isSingleProjectResponse(response)) throw new Error("Invalid response");

      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: projectsKeys.all,
      });
    },
  });

  return {
    ...mutationReturnValue,
    violations,
  };
};
