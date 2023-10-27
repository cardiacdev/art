import { UserTableSkeleton } from "@/components/skeleton/user-table-skeleton";

export default function Loading() {
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Benutzer
      </h1>
      <UserTableSkeleton />
    </main>
  );
}
