"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/lib/fetch/users/fetch-users";

export const UserTable = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return data?.map((user: any) => {
    return (
      <div key={user.id}>
        <p className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{user.name}</p>
      </div>
    );
  });
};
