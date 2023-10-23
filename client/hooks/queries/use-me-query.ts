"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchMe } from "@/lib/fetch/fetch-me";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: 1,
  });
};
