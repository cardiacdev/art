import { handleError } from "./handle-error";

export const fetchJsonLd = async (url: string, init?: RequestInit | undefined) => {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: "application/ld+json",
      Credentials: "include",
    },
  });
  await handleError(res);

  return res.json();
};
