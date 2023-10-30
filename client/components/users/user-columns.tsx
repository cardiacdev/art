"use client";

import { ColumnDef } from "@tanstack/react-table";
import Avatar from "boring-avatars";

import { UserMember } from "@/types/users";

import { UserActionsMenu } from "./user-actions-menu";

export const columns: ColumnDef<UserMember>[] = [
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => (
      <div className="w-1 ps-3">
        <Avatar size={25} name={row.original.username} variant="marble" />
      </div>
    ),
  },
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
