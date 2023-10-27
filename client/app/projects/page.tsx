import { env } from "@/env.mjs";
import { projectsKeys } from "@/hooks/queries/projects/projects-query-key-factory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { isProjectCollectionResponse } from "@/types/projects";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { createQueryClient } from "@/lib/query-client";
import { ProjectCards } from "@/components/projects/project-cards";

const fetchProjects = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);
  searchParams.get("page") || searchParams.append("page", "1");

  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/projects?${searchParams.toString()}`);

  if (!isProjectCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};
export default function Page() {
  const queryClient = createQueryClient();
  const defaultParams = { page: "1" };

  queryClient.prefetchQuery({
    queryKey: projectsKeys.allWithParams(defaultParams),
    queryFn: () => fetchProjects(defaultParams),
  });

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Projekte
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectCards />
      </HydrationBoundary>
    </main>
  );
}
