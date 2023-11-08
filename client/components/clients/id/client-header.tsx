"use client";

import { useSingleClientQuery } from "@/hooks/queries/clients/use-single-client-query";
import { useModal } from "@ebay/nice-modal-react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { DeleteClientDialog } from "./delete-client-dialog";
import { EditClientDialog } from "./edit-client-dialog";

interface ClientHeadingProps {
  id: string;
}

export const ClientHeader = ({ id }: ClientHeadingProps) => {
  const { data: client } = useSingleClientQuery(id);
  const editModal = useModal(EditClientDialog, { client });
  const deleteModal = useModal(DeleteClientDialog, { client });

  if (!client) return null;

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        {client.name}
      </h1>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => editModal.show({ client })}>
          <Pencil1Icon className="h-7 w-7" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-destructive"
          onClick={() => deleteModal.show({ client })}>
          <TrashIcon className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
};
