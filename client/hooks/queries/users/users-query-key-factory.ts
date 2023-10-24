export const usersKeys = {
  all: ["users"] as const,
  allWithPage: (page: string) => ["users", { page }] as const,
  me: ["users", "me"] as const,
};
