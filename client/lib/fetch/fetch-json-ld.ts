export const fetchJsonLd = async (url: string, init?: RequestInit | undefined) => {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: "application/ld+json",
      Credentials: "include",
    },
  });

  try {
    const json = await res.json();
    return json;
  } catch (e) {
    return res.status;
  }
};
