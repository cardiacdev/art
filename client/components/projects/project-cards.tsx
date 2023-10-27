"use client";

import { useProjectsQuery } from "@/hooks/queries/projects/use-projects-query";

import { ProjectCard } from "./project-card";

export const ProjectCards = () => {
  const { data } = useProjectsQuery();

  if (!data) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data["hydra:member"].map((project) => (
        <ProjectCard key={project["@id"]} project={project} />
      ))}
    </div>
  );
};
