import { env } from "@/env.mjs";
import { clientsKeys } from "@/hooks/queries/clients/clients-query-key-factory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { isProjectCollectionResponse } from "@/types/projects";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { createQueryClient } from "@/lib/query-client";
import { ClientCardsContainer } from "@/components/clients/client-cards-container";
import { CreateClientButton } from "@/components/clients/create-client-button";

const fetchClients = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/clients?${searchParams.toString()}`);

  if (!isProjectCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};
export default function Page() {
  const queryClient = createQueryClient();
  const searchParams = new URLSearchParams();
  searchParams.get("page") || searchParams.append("page", "1");
  searchParams.get("itemsPerPage") || searchParams.append("itemsPerPage", "12");

  queryClient.prefetchQuery({
    queryKey: clientsKeys.allWithParams(searchParams),
    queryFn: () => fetchClients(searchParams),
  });

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Kunden
      </h1>
      <CreateClientButton />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientCardsContainer />
      </HydrationBoundary>
    </main>
  );
}
