"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/lib/fetch/users/fetch-users";

import { usersKeys } from "./users-query-key-factory";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: usersKeys.all,
    queryFn: fetchUsers,
  });
};
