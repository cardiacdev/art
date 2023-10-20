import { env } from "@/env.mjs";

import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

export const fetchUsers = async () => {
  const res = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/users`);
  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};
