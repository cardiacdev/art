"use client";

import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSingleUserResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { EditUserFormValues } from "@/components/user/edit-user-dialog";

async function editUser(data: Partial<EditUserFormValues>, iri: string) {
  const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}${iri}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  const updatedUser = await res.json();

  if (!isSingleUserResponse(updatedUser)) throw new Error("Invalid response");

  return updatedUser;
}

export const useEditUserMutation = (iri: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<EditUserFormValues>) => editUser(data, iri),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: usersKeys.all,
      });
    },
  });
};
