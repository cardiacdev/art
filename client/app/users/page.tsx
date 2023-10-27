import { usersKeys } from "@/hooks/queries/users/users-query-key-factory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { fetchUsers } from "@/lib/fetch/users/fetch-users";
import { createQueryClient } from "@/lib/query-client";
import { UserTable } from "@/components/users/user-table";

export default async function Page() {
  const queryClient = createQueryClient();
  const defaultPageParam = "1";

  await queryClient.prefetchQuery({
    queryKey: usersKeys.allWithPage(defaultPageParam),
    queryFn: () => fetchUsers(defaultPageParam),
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
