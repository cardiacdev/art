"use client";

import { useState } from "react";

import { useUsersQuery } from "@/hooks/queries/users/use-users-query";
import { useModal } from "@ebay/nice-modal-react";
import { PaginationState } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { CreateUserDialog } from "./create-user-dialog";
import { columns } from "./user-columns";

export const UserTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const searchParams = new URLSearchParams();
  searchParams.append("page", `${pagination.pageIndex + 1}`);
  const { data } = useUsersQuery(searchParams);

  const createModal = useModal(CreateUserDialog);

  if (!data) return null;

  return (
    <>
      <Button variant="default" className="ml-auto" onClick={() => createModal.show()}>
        Benutzer anlegen
      </Button>
      <DataTable
        columns={columns}
        data={data["hydra:member"]}
        onPaginationChange={setPagination}
        pagination={pagination}
        pageCount={Math.ceil(data["hydra:totalItems"] / pagination.pageSize)}
      />
    </>
  );
};
