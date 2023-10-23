import { Skeleton } from "@/components/ui/skeleton";

export const UserTableSkeleton = () => {
  const counter = Array.from({ length: 6 }, (_, i) => i);
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full flex-col gap-2">
        {counter.map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </main>
  );
};
