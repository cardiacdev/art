import { Skeleton } from "../ui/skeleton";

export const ProjectCardsSkeleton = () => {
  const cards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((i) => (
        <Skeleton key={i} className="h-[150px] w-[320px] rounded-xl" />
      ))}
    </div>
  );
};
