"use client";

import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleTaskResponse } from "@/types/tasks";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { CreateTaskFormValues } from "@/components/tasks/create-task-dialog";

export const useCreateTaskMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  const { violations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async (data: CreateTaskFormValues) => {
      const response = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      processResponse(response);

      if (!isSingleTaskResponse(response)) throw new Error("Invalid response");

      return response;
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: projectsKeys.tasksWithParams(projectId, {}),
      });
    },
  });

  return {
    ...mutationReturnValue,
    violations,
  };
};
