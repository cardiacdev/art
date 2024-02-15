"use client";

import { useState } from "react";

import {
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { columns, hiddenOrderColumns, hiddenTaskColumns } from "@/components/projects/id/table/task-columns";

import { useTasksByProjectQuery } from "../queries/projects/use-tasks-by-project-query";

export const useProjectTaskTable = (projectId: string, type: "order" | "tasks" = "order") => {
  const initialColumns = type === "order" ? hiddenOrderColumns : hiddenTaskColumns;
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumns);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([{ id: "orderConfirmationDate", desc: true }]);

  const searchParams = new URLSearchParams();
  searchParams.append("page", `${pagination.pageIndex + 1}`);

  if (sorting[0] && sorting[0].id !== "") {
    searchParams.append(`order[${sorting[0].id}]`, sorting[0].desc ? "desc" : "asc");
  }

  const { data } = useTasksByProjectQuery(projectId, searchParams);

  const pageCount = data ? Math.ceil(data["hydra:totalItems"] / pagination.pageSize) : 1;

  const table = useReactTable({
    columns: columns,
    data: data?.["hydra:member"] ?? [],
    state: { pagination, columnVisibility, sorting },
    pageCount,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    manualPagination: true,
    enableSorting: true,
    manualSorting: true,
    enableSortingRemoval: false, // not setting this or setting it to true will cause a bug
  });

  return {
    pageCount,
    pagination,
    table,
  };
};
