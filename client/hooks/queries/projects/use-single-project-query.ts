"use client";

import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

import { isSingleProjectResponse } from "@/types/projects";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

import { projectsKeys } from "./projects-query-key-factory";

const fetchProject = async (id: string) => {
  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);

  if (!isSingleProjectResponse(data)) throw new Error("Invalid response");

  return data;
};

export const useSingleProjectQuery = (id: string) => {
  return useQuery({
    queryKey: projectsKeys.single(id),
    queryFn: () => fetchProject(id),
  });
};
