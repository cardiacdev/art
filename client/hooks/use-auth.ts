"use client";

import { useMeQuery } from "./queries/users/use-me-query";

export const useAuth = () => {
  const { data, isPending } = useMeQuery();

  return {
    isAuthenticated: !!data,
    user: data,
    isGranted: (role: string) => {
      if (!data) return false;

      return data.roles.includes(role);
    },
    isPending,
  };
};
