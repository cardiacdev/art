import { SearchParams } from "@/types/utils";

export const projectsKeys = {
  all: ["projects"] as const,
  allWithParams: (params: SearchParams) => ["projects", { params }] as const,
};
