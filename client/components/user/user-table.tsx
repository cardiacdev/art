"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/lib/fetch/users/fetch-users";

export const UserTable = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (!data) return <div>Loading...</div>;

  return data["hydra:member"]?.map((user: any) => {
    return (
      <div key={user["@id"]} className="border">
        <p className="whitespace-nowrap px-6 py-4 text-sm font-medium">{user.username}</p>
        <p className="whitespace-nowrap px-6 py-4 text-sm font-medium">{user.email}</p>
      </div>
    );
  });
};
