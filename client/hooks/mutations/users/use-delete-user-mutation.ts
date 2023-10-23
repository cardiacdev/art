"use client";

import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

async function deleteUser(iri: string) {
  const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
}

export const useDeleteUserMutation = (iri: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(iri),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      }),
  });
};
