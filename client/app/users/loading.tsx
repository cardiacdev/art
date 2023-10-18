import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const counter = Array.from({ length: 6 }, (_, i) => i);
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Users
      </h1>
      <Skeleton className="my-6 h-11 w-96" />
      <div className="flex w-full flex-col gap-4">
        {counter.map((_, i) => (
          <Skeleton key={i} className="h-16 w-10/12" />
        ))}
      </div>
    </main>
  );
}
