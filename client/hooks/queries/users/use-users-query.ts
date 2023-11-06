"use client";

import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

import { isUserCollectionResponse } from "@/types/users";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

import { usersKeys } from "./users-query-key-factory";

const fetchUsers = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/users?${searchParams.toString()}`);

  if (!isUserCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};

export const useUsersQuery = (params: SearchParams) => {
  return useQuery({
    queryKey: usersKeys.allWithParams(params),
    queryFn: () => fetchUsers(params),
  });
};
