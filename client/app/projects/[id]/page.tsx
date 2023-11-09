import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { isSingleProjectResponse } from "@/types/projects";
import { isTaskCollectionResponse } from "@/types/tasks";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { createQueryClient } from "@/lib/query-client";
import { ProjectHeader } from "@/components/projects/id/project-header";

const fetchProject = async (id: string) => {
  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);

  if (!isSingleProjectResponse(data)) throw new Error("Invalid response");

  return data;
};

const fetchTasksByProject = async (id: string, params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetchJsonLd(
    `${env.NEXT_PUBLIC_API_URL}/api/projects/${id}/tasks?${searchParams.toString()}`,
  );

  if (!isTaskCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};

interface PageProps {
  params: { id: string };
}

export default function Page({ params: { id } }: PageProps) {
  const queryClient = createQueryClient();

  // Prefetch project
  queryClient.prefetchQuery({
    queryKey: projectsKeys.single(id),
    queryFn: () => fetchProject(id),
  });

  // Prefetch tasks for project
  const params = new URLSearchParams();
  params.append("page", "1");
  queryClient.prefetchQuery({
    queryKey: projectsKeys.tasksWithParams(id, params),
    queryFn: () => fetchTasksByProject(id, params),
  });

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectHeader id={id} />
      </HydrationBoundary>
    </main>
  );
}
