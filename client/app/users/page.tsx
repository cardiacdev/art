import { env } from "@/env.mjs";
import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { isUserCollectionResponse } from "@/types/users";
import { SearchParams } from "@/types/utils";
import { fetchJsonLd } from "@/lib/fetch/fetch-json-ld";
import { createQueryClient } from "@/lib/query-client";
import { UserTable } from "@/components/users/user-table";

const fetchUsers = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);
  const data = await fetchJsonLd(`${env.NEXT_PUBLIC_API_URL}/api/users${searchParams.toString()}`);

  if (!isUserCollectionResponse(data)) throw new Error("Invalid response");

  return data;
};

export default async function Page() {
  const queryClient = createQueryClient();
  const searchParams = new URLSearchParams();
  searchParams.append("page", "1");

  await queryClient.prefetchQuery({
    queryKey: usersKeys.allWithParams(searchParams),
    queryFn: () => fetchUsers(searchParams),
  });

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Benutzer
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserTable />
      </HydrationBoundary>
    </main>
  );
}
