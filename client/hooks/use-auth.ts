"use client";

import { useMeQuery } from "./queries/users/use-me-query";

export const useAuth = () => {
  const { data } = useMeQuery();

  return {
    isAuthenticated: !!data,
    user: {
      id: data?.id,
      email: data?.email,
      name: data?.username,
    },
    isGranted: (role: string) => {
      if (!data) return false;

      return data.roles.includes(role);
    },
  };
};
