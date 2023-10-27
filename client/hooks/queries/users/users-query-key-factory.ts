export const usersKeys = {
  all: ["users"] as const,
  allWithPage: (page = "1") => ["users", { page }] as const,
  me: ["me"] as const,
};
