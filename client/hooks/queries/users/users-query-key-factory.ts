export const usersKeys = {
  all: ["users"] as const,
  allWithPage: (page: string) => ["users", { page }] as const,
  me: ["me"] as const,
};
