"use client";

import { useProjectTaskTable } from "@/hooks/table/use-project-task-table";
import { useModal } from "@ebay/nice-modal-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { TableViewOptions } from "@/components/ui/table-view-options";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";

interface TaskTableProps {
  projectId: string;
  type?: "order" | "tasks";
}

export const TaskTable = ({ projectId, type = "order" }: TaskTableProps) => {
  const { table, pageCount, pagination } = useProjectTaskTable(projectId, type);
  const createModal = useModal(CreateTaskDialog, { projectId });

  return (
    <>
      <div className="flex justify-between">
        <TableViewOptions table={table} />
        <Button variant="default" onClick={() => createModal.show()}>
          Task anlegen
        </Button>
      </div>
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
