"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserMember } from "@/types/users";

import { UserActionsMenu } from "./user-actions-menu";

export const columns: ColumnDef<UserMember>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "Aktionen",
    cell: ({ row }) => {
      return <UserActionsMenu user={row.original} />;
    },
  },
];
