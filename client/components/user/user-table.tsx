"use client";

import { useUsersQuery } from "@/hooks/queries/users/use-users-query";

export const UserTable = () => {
  const { data } = useUsersQuery();

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
