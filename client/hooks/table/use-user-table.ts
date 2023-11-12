"use client";

import { useState } from "react";

import { getCoreRowModel, PaginationState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { columns } from "@/components/users/user-columns";

import { useUsersQuery } from "../queries/users/use-users-query";

export const useUserTable = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const searchParams = new URLSearchParams();
  searchParams.append("page", `${pagination.pageIndex + 1}`);
  const { data } = useUsersQuery(searchParams);

  const pageCount = data ? Math.ceil(data["hydra:totalItems"] / pagination.pageSize) : 1;

  const table = useReactTable({
    columns: columns,
    data: data?.["hydra:member"] ?? [],
    state: { pagination, columnVisibility },
    pageCount,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
  });

  return {
    pageCount,
    pagination,
    table,
  };
};
