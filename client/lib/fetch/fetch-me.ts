import { env } from "@/env.mjs";

import { isMeResponse } from "@/types/users";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

export const fetchMe = async () => {
  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/me`);

  if (!isMeResponse(data)) throw new Error("Invalid response");

  return data;
};
