import { env } from "@/env.mjs";

import { isUserCollectionResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

export const fetchUsers = async (page: string) => {
  const searchParams = new URLSearchParams({ page });

  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/users?${searchParams.toString()}`);

  if (!isUserCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};
