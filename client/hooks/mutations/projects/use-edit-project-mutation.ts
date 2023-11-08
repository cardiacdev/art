"use client";

import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleProjectResponse } from "@/types/projects";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { EditProjectFormValues } from "@/components/projects/id/edit-project-dialog";

export const useEditProjectMutation = (iri: string) => {
  const queryClient = useQueryClient();
  const { violations, resetViolations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: Partial<EditProjectFormValues>) => {
      const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      });
      processResponse(res);
      if (!isSingleProjectResponse(res)) throw new Error("Invalid response");

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectsKeys.all,
      });
    },
  });

  return {
    ...mutationReturnValue,
    violations,
    resetViolations,
  };
};
