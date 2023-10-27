"use client";

import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

import { isUserCollectionResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

import { usersKeys } from "./users-query-key-factory";

const fetchUsers = async (page: string) => {
  const searchParams = new URLSearchParams({ page });

  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/users?${searchParams.toString()}`);

  if (!isUserCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};

export const useUsersQuery = ({ page = "1" }) => {
  return useQuery({
    queryKey: usersKeys.allWithPage(page),
    queryFn: () => fetchUsers(page),
  });
};
