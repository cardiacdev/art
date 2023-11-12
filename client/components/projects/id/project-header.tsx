"use client";

import { useState } from "react";
import Link from "next/link";

import { useSingleProjectQuery } from "@/hooks/queries/projects/use-single-project-query";
import { useModal } from "@ebay/nice-modal-react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { iriToId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlainTabsList, PlainTabsTrigger } from "@/components/ui/plain-tabs";

import { DeleteProjectDialog } from "./delete-project-dialog";
import { EditProjectDialog } from "./edit-project-dialog";
import { ProjectStats } from "./project-stats";
import { TaskTable } from "./table/task-table";

interface ProjectHeadingProps {
  id: string;
}

export const ProjectHeader = ({ id }: ProjectHeadingProps) => {
  const [activeTab, setActiveTab] = useState<"order" | "tasks" | "stats">("order");
  const { data: project } = useSingleProjectQuery(id);
  const editModal = useModal(EditProjectDialog, { project });
  const deleteModal = useModal(DeleteProjectDialog, { project });

  if (!project) return null;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-y-2 border-2 border-x-0 border-t-0 border-muted pb-1 sm:gap-y-0 md:flex-nowrap">
        <h1 className="flex items-end gap-4">
          <span className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {project.name}
          </span>
          <Link
            className="text-md hidden pt-2 text-muted-foreground hover:underline sm:text-lg md:block md:text-xl lg:text-2xl"
            href={`/clients/${iriToId(project.client["@id"])}`}>
            ({project.client.name})
          </Link>
        </h1>
        <PlainTabsList className="-m-1 mt-0 grid grid-cols-3 rounded-none rounded-t-lg">
          <PlainTabsTrigger
            onClick={() => setActiveTab("order")}
            data-state={activeTab === "order" ? "active" : undefined}>
            Bestellung
          </PlainTabsTrigger>
          <PlainTabsTrigger
            onClick={() => setActiveTab("tasks")}
            data-state={activeTab === "tasks" ? "active" : undefined}>
            Aufgaben
          </PlainTabsTrigger>
          <PlainTabsTrigger
            onClick={() => setActiveTab("stats")}
            data-state={activeTab === "stats" ? "active" : undefined}>
            Statistik
          </PlainTabsTrigger>
        </PlainTabsList>
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
      {activeTab === "order" && <TaskTable projectId={id} type="order" />}
      {activeTab === "tasks" && <TaskTable projectId={id} type="tasks" />}
      {activeTab === "stats" && <ProjectStats id={id} />}
    </>
  );
};
