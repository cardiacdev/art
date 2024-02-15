"use client";

import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { flexRender, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="whitespace-nowrap">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder ? null : (
                        <span className={header.column.getCanSort() ? "cursor-pointer hover:underline" : ""}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                      {header.column.getIsSorted() === "asc" && <CaretUpIcon className="inline" />}
                      {header.column.getIsSorted() === "desc" && <CaretDownIcon className="inline" />}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
