"use client";

import { useState } from "react";

import { useClientsQuery } from "@/hooks/queries/clients/use-clients-query";

import { PaginationControls } from "../ui/pagination-controls";
import { ClientCard } from "./client-card";

export const ClientCardsContainer = () => {
  const [page, setPage] = useState(1);
  const searchParams = new URLSearchParams();

  searchParams.append("itemsPerPage", "12");
  searchParams.append("page", `${page}`);
  const { data } = useClientsQuery(searchParams);

  if (!data) return null;

  const pageCount = Math.ceil(data["hydra:totalItems"] / 12);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data["hydra:member"].map((client) => (
          <ClientCard key={client["@id"]} client={client} />
        ))}
      </div>
      <PaginationControls
        page={page}
        pageCount={pageCount}
        first={() => setPage(1)}
        previous={() => setPage(page - 1)}
        next={() => setPage(page + 1)}
        last={() => setPage(pageCount)}
      />
    </>
  );
};
