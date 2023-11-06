"use client";

import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

import { isClientCollectionResponse } from "@/types/clients";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

import { clientsKeys } from "./clients-query-key-factory";

const fetchClients = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/clients?${searchParams.toString()}`);

  if (!isClientCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};

export const useClientsQuery = (params?: SearchParams) => {
  return useQuery({
    queryKey: clientsKeys.allWithParams(params),
    queryFn: () => fetchClients(params),
  });
};
