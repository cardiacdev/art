"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchMe } from "@/lib/fetch/fetch-me";

import { usersKeys } from "./users-query-key-factory";

export const useMeQuery = () => {
  return useQuery({
    queryKey: usersKeys.me,
    queryFn: fetchMe,
    retry: 1,
  });
};
