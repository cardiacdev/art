"use client";

import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

import { isProjectCollectionResponse } from "@/types/projects";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

import { projectsKeys } from "./projects-query-key-factory";

const fetchProjects = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);
  searchParams.get("page") || searchParams.append("page", "1");

  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/projects?${searchParams.toString()}`);

  if (!isProjectCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};

export const useProjectsQuery = (params?: SearchParams) => {
  return useQuery({
    queryKey: projectsKeys.allWithParams(params),
    queryFn: () => fetchProjects(params),
  });
};
