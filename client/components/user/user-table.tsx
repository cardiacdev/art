"use client";

import { useState } from "react";

import { useUsersQuery } from "@/hooks/queries/users/use-users-query";
import { PaginationState } from "@tanstack/react-table";

import { DataTable } from "../ui/data-table";
import { columns } from "./user-columns";

export const UserTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data } = useUsersQuery({
    page: `${pagination.pageIndex + 1}`,
  });

  if (!data) return <div>Loading...</div>;

  return (
    <DataTable
      columns={columns}
      data={data["hydra:member"]}
      onPaginationChange={setPagination}
      pagination={pagination}
      pageCount={Math.ceil(data["hydra:totalItems"] / pagination.pageSize)}
    />
  );
};
