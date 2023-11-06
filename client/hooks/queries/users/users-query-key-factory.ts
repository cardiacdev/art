import { SearchParams } from "@/types/utils";
import { URLSearchParamsToObj } from "@/lib/utils";

export const usersKeys = {
  all: ["users"] as const,
  allWithParams: (params: SearchParams) => ["users", { params: URLSearchParamsToObj(params) }] as const,
  me: ["me"] as const,
};
