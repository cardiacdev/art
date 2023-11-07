"use client";

import { useSingleClientQuery } from "@/hooks/queries/clients/use-single-client-query";

interface ClientHeadingProps {
  id: string;
}

export const ClientHeading = ({ id }: ClientHeadingProps) => {
  const { data } = useSingleClientQuery(id);

  return (
    <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
      {data?.name}
    </h1>
  );
};
