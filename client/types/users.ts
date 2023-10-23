import { z } from "zod";

import { createHydraCollectionSchema } from "./hydra";

export const userResponseSchema = z.object({
  username: z.string(),
  email: z.string(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

export const userCollectionResponseSchema = createHydraCollectionSchema(userResponseSchema);

export type UserCollectionResponse = z.infer<typeof userCollectionResponseSchema>;

export const isUserCollectionResponse = (obj: unknown): obj is UserCollectionResponse => {
  const isSuccess = userCollectionResponseSchema.safeParse(obj).success;

  if (!isSuccess) {
    console.warn("Invalid user collection response");
    return false;
  }
  return true;
};

export const meResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  roles: z.array(z.string()),
});

export type MeResponse = z.infer<typeof meResponseSchema>;

export const isMeResponse = (obj: unknown): obj is MeResponse => {
  const isSuccess = meResponseSchema.safeParse(obj).success;

  if (!isSuccess) {
    console.trace("Invalid response", obj);
    return false;
  }
  return true;
};
