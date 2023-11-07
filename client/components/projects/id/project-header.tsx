"use client";

import Link from "next/link";

import { useSingleProjectQuery } from "@/hooks/queries/projects/use-single-project-query";
import { useModal } from "@ebay/nice-modal-react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { iriToId } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { DeleteProjectDialog } from "./delete-project-dialog";
import { EditProjectDialog } from "./edit-project-dialog";

interface ProjectHeadingProps {
  id: string;
}

export const ProjectHeader = ({ id }: ProjectHeadingProps) => {
  const { data: project } = useSingleProjectQuery(id);
  const editModal = useModal(EditProjectDialog, { project });
  const deleteModal = useModal(DeleteProjectDialog, { project });

  if (!project) return null;

  return (
    <div className="flex items-center justify-between">
      <h1 className="flex items-center gap-4">
        <span className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {project.name}
        </span>
        <Link
          className="text-md pt-2 text-muted-foreground hover:underline sm:text-lg md:text-xl lg:text-2xl"
          href={`/clients/${iriToId(project.client["@id"])}`}>
          ({project.client.name})
        </Link>
      </h1>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => editModal.show({ project })}>
          <Pencil1Icon className="h-7 w-7" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-destructive"
          onClick={() => deleteModal.show({ project })}>
          <TrashIcon className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
};
