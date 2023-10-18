import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 7,
        refetchInterval: 1000 * 7,
      },
    },
  });
};
