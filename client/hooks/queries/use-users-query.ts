"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/lib/fetch/users/fetch-users";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
