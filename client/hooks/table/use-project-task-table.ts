"use client";

import { useState } from "react";

import { getCoreRowModel, PaginationState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { columns, hiddenOrderColumns, hiddenTaskColumns } from "@/components/projects/id/table/task-columns";

import { useTasksByProjectQuery } from "../queries/projects/use-tasks-by-project-query";

export const useProjectTaskTable = (projectId: string, type: "order" | "tasks" = "order") => {
  const initialColumns = type === "order" ? hiddenOrderColumns : hiddenTaskColumns;
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumns);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const searchParams = new URLSearchParams();
  searchParams.append("page", `${pagination.pageIndex + 1}`);
  const { data } = useTasksByProjectQuery(projectId, searchParams);

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
