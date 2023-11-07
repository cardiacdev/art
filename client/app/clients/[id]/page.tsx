import { env } from "@/env.mjs";
import { clientsKeys } from "@/hooks/queries/clients/clients-query-key-factory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { isSingleClientResponse } from "@/types/clients";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { createQueryClient } from "@/lib/query-client";
import { ClientHeader } from "@/components/clients/id/client-header";

const fetchClient = async (id: string) => {
  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/clients/${id}`);

  if (!isSingleClientResponse(data)) throw new Error("Invalid response");

  return data;
};

interface PageProps {
  params: { id: string };
}

export default function Page({ params: { id } }: PageProps) {
  const queryClient = createQueryClient();

  queryClient.prefetchQuery({
    queryKey: clientsKeys.single(id),
    queryFn: () => fetchClient(id),
  });

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientHeader id={id} />
      </HydrationBoundary>
    </main>
  );
}
