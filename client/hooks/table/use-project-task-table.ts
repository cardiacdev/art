"use client";

import { useState } from "react";

import { PaginationState } from "@tanstack/react-table";

import { hiddenOrderColumns, hiddenTaskColumns } from "@/components/projects/id/table/task-columns";

import { useTasksByProjectQuery } from "../queries/projects/use-tasks-by-project-query";

export const useProjectTaskTable = (projectId: string, type: "order" | "tasks" = "order") => {
  const initialColumns = type === "order" ? hiddenOrderColumns : hiddenTaskColumns;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const searchParams = new URLSearchParams();
  searchParams.append("page", `${pagination.pageIndex + 1}`);
  const { data } = useTasksByProjectQuery(projectId, searchParams);

  return {
    data,
    pagination,
    setPagination,
    initialColumns,
  };
};
