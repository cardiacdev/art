"use client";

import { useSingleProjectQuery } from "@/hooks/queries/projects/use-single-project-query";

interface ProjectHeadingProps {
  id: string;
}

export const ProjectHeading = ({ id }: ProjectHeadingProps) => {
  const { data } = useSingleProjectQuery(id);

  return (
    <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
      {data?.name}
    </h1>
  );
};
