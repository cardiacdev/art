"use client";

import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

import { isSingleClientResponse } from "@/types/clients";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

import { clientsKeys } from "./clients-query-key-factory";

const fetchClient = async (id: string) => {
  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/clients/${id}`);

  if (!isSingleClientResponse(data)) throw new Error("Invalid response");

  return data;
};

export const useSingleClientQuery = (id: string) => {
  return useQuery({
    queryKey: clientsKeys.single(id),
    queryFn: () => fetchClient(id),
  });
};
