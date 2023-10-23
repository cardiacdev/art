export const usersKeys = {
  all: (page: string) => ["users", { page }] as const,
  me: ["me"] as const,
};
