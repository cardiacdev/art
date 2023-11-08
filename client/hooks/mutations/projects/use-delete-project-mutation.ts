"use client";

import { useRouter } from "next/navigation";

import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { useHandleMutationErrors } from "@/hooks/use-handle-mutation-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { iriToId } from "@/lib/utils";

export const useDeleteProjectMutation = (iri: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { violations, resetViolations, processResponse } = useHandleMutationErrors();

  const mutationReturnValue = useMutation({
    mutationFn: async () => {
      const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
        method: "DELETE",
      });
      processResponse(res);
    },
    onSuccess: () => {
      router.push("/projects");
      queryClient.removeQueries({
        queryKey: projectsKeys.single(iriToId(iri)),
      });
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
