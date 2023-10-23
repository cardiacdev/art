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
    console.trace("Invalid user collection response", obj);
    return false;
  }
  return true;
};
