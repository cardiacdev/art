"use client";

import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleTaskResponse } from "@/types/tasks";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { EditTaskFormValues } from "@/components/tasks/edit-task-dialog";

export const useEditTaskMutation = (iri: string) => {
  const queryClient = useQueryClient();
  const { violations, resetViolations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: Partial<EditTaskFormValues>) => {
      const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      });
      processResponse(res);

      if (!isSingleTaskResponse(res)) throw new Error("Invalid response");

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
