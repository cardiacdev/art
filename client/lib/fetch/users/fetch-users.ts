import { env } from "@/env.mjs";

import { isUserCollectionResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

export const fetchUsers = async (page: string) => {
  const searchParams = new URLSearchParams({ page });

  const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/users?${searchParams.toString()}`);
  if (!res.ok) throw new Error(res.statusText);

  const data = await res.json();

  if (!isUserCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};
