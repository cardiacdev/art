import { SearchParams } from "@/types/utils";
import { URLSearchParamsToObj } from "@/lib/utils";

export const projectsKeys = {
  all: ["projects"] as const,
  allWithParams: (params: SearchParams) => ["projects", { params: URLSearchParamsToObj(params) }] as const,
};
