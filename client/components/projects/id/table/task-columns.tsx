"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TaskMember } from "@/types/tasks";
import { isoToFormat, trimString } from "@/lib/utils";

import { TaskActionsMenu } from "./task-actions-menu";

export const columns: ColumnDef<TaskMember>[] = [
  {
    accessorKey: "reference",
    header: "Referenz",
  },
  {
    accessorKey: "title",
    header: "Titel",
    cell: ({ row }) => {
      const trimmedString = trimString(row.original.title, 20);
      return <span title={row.original.title}>{trimmedString}</span>;
    },
  },
  {
    accessorKey: "externalHours",
    header: "Std.",
  },
  {
    accessorKey: "euroAmount",
    header: "Betrag",
  },
  {
    accessorKey: "remarks",
    header: "Bemerkungen",
    cell: ({ row }) => {
      const trimmedString = trimString(row.original.remarks, 20);
      return <span title={row.original.remarks}>{trimmedString}</span>;
    },
  },
  {
    accessorKey: "orderNumber",
    header: "Bestellnr.",
  },
  {
    accessorKey: "plannedCompletionDate",
    header: "Zugesagt",
    cell: ({ row }) => {
      const date = row.original.plannedCompletionDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "firstSandboxDeploymentDate",
    header: "Sandbox",
    cell: ({ row }) => {
      const date = row.original.firstSandboxDeploymentDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "firstLiveDeploymentDate",
    header: "Produktiv",
    cell: ({ row }) => {
      const date = row.original.firstLiveDeploymentDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "orderConfirmationDate",
    header: "Bestelldatum",
    cell: ({ row }) => {
      const date = row.original.orderConfirmationDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "project.name",
    header: "Projekt",
  },
  {
    accessorKey: "invoiceItems.length",
    header: "Posten",
    // enableSorting: true,
  },
  {
    id: "Aktionen",
    enableSorting: false,
    cell: ({ row }) => {
      return <TaskActionsMenu task={row.original} />;
    },
  },
];

export const hiddenOrderColumns = {
  Zugesagt: false,
  Sandbox: false,
  Produktiv: false,
  Bemerkungen: false,
  Projekt: false,
};

export const hiddenTaskColumns = {
  Betrag: false,
  "Bestellnr.": false,
  Bestelldatum: false,
  Projekt: false,
};
