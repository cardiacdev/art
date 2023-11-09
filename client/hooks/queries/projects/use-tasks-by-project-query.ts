"use client";

import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

import { isTaskCollectionResponse } from "@/types/tasks";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";

import { projectsKeys } from "./projects-query-key-factory";

const fetchTasksByProject = async (id: string, params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetchJsonLd(
    `${env.NEXT_PUBLIC_API_URL}/api/projects/${id}/tasks?${searchParams.toString()}`,
  );

  console.log(data)

  if (!isTaskCollectionResponse(data)) throw new Error("Invalid response");

  console.log('wtf')

  return data;
};

export const useTasksByProjectQuery = (id: string, params: SearchParams) => {
  return useQuery({
    queryKey: projectsKeys.tasksWithParams(id, params),
    queryFn: () => fetchTasksByProject(id, params),
  });
};
