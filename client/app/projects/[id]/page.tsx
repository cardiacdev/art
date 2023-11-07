import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { isSingleProjectResponse } from "@/types/projects";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { createQueryClient } from "@/lib/query-client";
import { ProjectHeading } from "@/components/projects/id/project-heading";

const fetchProject = async (id: string) => {
  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);

  if (!isSingleProjectResponse(data)) throw new Error("Invalid response");

  return data;
};

interface PageProps {
  params: { id: string };
}

export default function Page({ params: { id } }: PageProps) {
  const queryClient = createQueryClient();

  queryClient.prefetchQuery({
    queryKey: projectsKeys.single(id),
    queryFn: () => fetchProject(id),
  });

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectHeading id={id} />
      </HydrationBoundary>
    </main>
  );
}
