"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TaskMember } from "@/types/tasks";
import { isoToFormat, trimString } from "@/lib/utils";

import { TaskActionsMenu } from "./task-actions-menu";

export const columns: ColumnDef<TaskMember>[] = [
  {
    accessorKey: "reference",
    header: "Referenz",
    id: "Referenz",
  },
  {
    accessorKey: "title",
    header: "Titel",
    id: "Titel",
    cell: ({ row }) => {
      const trimmedString = trimString(row.original.title, 20);
      return <span title={row.original.title}>{trimmedString}</span>;
    },
  },
  {
    accessorKey: "externalHours",
    header: "Std.",
    id: "Std.",
  },
  {
    accessorKey: "euroAmount",
    header: "Betrag",
    id: "Betrag",
  },
  {
    accessorKey: "remarks",
    header: "Bemerkungen",
    id: "Bemerkungen",
    cell: ({ row }) => {
      const trimmedString = trimString(row.original.remarks, 20);
      return <span title={row.original.remarks}>{trimmedString}</span>;
    },
  },
  {
    accessorKey: "orderNumber",
    header: "Bestellnr.",
    id: "Bestellnr.",
  },
  {
    accessorKey: "plannedCompletionDate",
    header: "Zugesagt",
    id: "Zugesagt",
    cell: ({ row }) => {
      const date = row.original.plannedCompletionDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "firstSandboxDeploymentDate",
    header: "Sandbox",
    id: "Sandbox",
    cell: ({ row }) => {
      const date = row.original.firstSandboxDeploymentDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "firstLiveDeploymentDate",
    header: "Produktiv",
    id: "Produktiv",
    cell: ({ row }) => {
      const date = row.original.firstLiveDeploymentDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "orderConfirmationDate",
    header: "Bestelldatum",
    id: "Bestelldatum",
    cell: ({ row }) => {
      const date = row.original.orderConfirmationDate;
      if (!date) return null;
      return isoToFormat(date);
    },
  },
  {
    accessorKey: "project.name",
    header: "Projekt",
    id: "Projekt",
  },
  {
    accessorKey: "invoiceItems.length",
    header: "Posten",
    id: "Posten",
  },
  {
    id: "Aktionen",
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
