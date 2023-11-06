import { SearchParams } from "@/types/utils";

export const clientsKeys = {
  all: ["clients"] as const,
  allWithParams: (params: SearchParams) => ["clients", { params }] as const,
};
