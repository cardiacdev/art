import { env } from "@/env.mjs";

import { isMeResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

export const fetchMe = async () => {
  const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/me`);
  if (!res.ok) throw new Error(res.statusText);

  const data = await res.json();

  if (!isMeResponse(data)) throw new Error("Invalid response");

  return data;
};
