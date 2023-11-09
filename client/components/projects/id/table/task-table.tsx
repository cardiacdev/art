"use client";

import { useProjectTaskTable } from "@/hooks/table/use-project-task-table";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./task-columns";

interface TaskTableProps {
  projectId: string;
  type?: "order" | "tasks";
}

export const TaskTable = ({ projectId, type = "order" }: TaskTableProps) => {
  const { data, pagination, setPagination, initialColumns } = useProjectTaskTable(projectId, type);

  if (!data) return null;

  return (
    <>
      <DataTable
        columns={columns}
        data={data["hydra:member"]}
        onPaginationChange={setPagination}
        pagination={pagination}
        pageCount={Math.ceil(data["hydra:totalItems"] / pagination.pageSize)}
        initialColumns={initialColumns}
      />
    </>
  );
};
