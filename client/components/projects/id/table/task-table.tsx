"use client";

import { useProjectTaskTable } from "@/hooks/table/use-project-task-table";

import { DataTable } from "@/components/ui/data-table";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { TableViewOptions } from "@/components/ui/table-view-options";

interface TaskTableProps {
  projectId: string;
  type?: "order" | "tasks";
}

export const TaskTable = ({ projectId, type = "order" }: TaskTableProps) => {
  const { table, pageCount, pagination } = useProjectTaskTable(projectId, type);

  return (
    <>
      <TableViewOptions table={table} />
      <DataTable table={table} />
      <PaginationControls
        page={pagination.pageIndex + 1}
        pageCount={pageCount}
        first={() => table.setPageIndex(0)}
        previous={() => table.previousPage()}
        next={() => table.nextPage()}
        last={() => table.setPageIndex(table.getPageCount() - 1)}
      />
    </>
  );
};
