import { Skeleton } from "../ui/skeleton";

export const ProjectCardsSkeleton = () => {
  const cards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((i) => (
        <Skeleton
          key={i}
          className="rounded-xl md:h-[150px] md:w-[340px] lg:w-[240px] xl:h-[150px] xl:w-[320px]"
        />
      ))}
    </div>
  );
};
