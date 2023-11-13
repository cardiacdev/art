"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { TaskMember } from "@/types/tasks";
import { trimString } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  },
  {
    accessorKey: "firstSandboxDeploymentDate",
    header: "Sandbox",
    id: "Sandbox",
  },
  {
    accessorKey: "firstLiveDeploymentDate",
    header: "Produktiv",
    id: "Produktiv",
  },
  {
    accessorKey: "orderConfirmationDate",
    header: "Bestelldatum",
    id: "Bestelldatum",
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
};

export const hiddenTaskColumns = {
  Betrag: false,
  "Bestellnr.": false,
  Bestelldatum: false,
  Zugesagt: false,
};
