"use client";

import { useUserTable } from "@/hooks/table/use-user-table";
import { useModal } from "@ebay/nice-modal-react";

import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { PaginationControls } from "../ui/pagination-controls";
import { TableViewOptions } from "../ui/table-view-options";
import { CreateUserDialog } from "./create-user-dialog";

export const UserTable = () => {
  const { table, pageCount, pagination } = useUserTable();

  const createModal = useModal(CreateUserDialog);

  return (
    <>
      <div className="flex justify-between">
        <TableViewOptions table={table} />
        <Button variant="default" className="ml-auto" onClick={() => createModal.show()}>
          Benutzer anlegen
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
