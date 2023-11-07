import { SearchParams } from "@/types/utils";
import { URLSearchParamsToObj } from "@/lib/utils";

export const clientsKeys = {
  all: ["clients"] as const,
  allWithParams: (params: SearchParams) => ["clients", { params: URLSearchParamsToObj(params) }] as const,
  single: (id: string) => ["clients", id] as const,
};
