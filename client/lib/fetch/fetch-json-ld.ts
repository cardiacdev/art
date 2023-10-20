export const fetchJsonLd = async (url: string, init?: RequestInit | undefined) => {
  return fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: "application/ld+json",
      Credentials: "include",
    },
  });
};
