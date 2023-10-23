"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/lib/fetch/users/fetch-users";

import { usersKeys } from "./users-query-key-factory";

export const useUsersQuery = ({ page = "1" }: { page?: string }) => {
  return useQuery({
    queryKey: usersKeys.allWithPage(page),
    queryFn: () => fetchUsers(page),
  });
};
