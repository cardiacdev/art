import { z } from "zod";

import { createHydraCollectionSchema, createHydraMemberSchema } from "./hydra";

// ----- STANDARD FIELDS -----
export const userResponseSchema = z.object({
  username: z.string(),
  email: z.string(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

// ----- COLLECTIONS -----
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

// ----- COLLECTION  MEMBERS -----
export const userMemberSchema = createHydraMemberSchema(userResponseSchema);

export type UserMember = z.infer<typeof userMemberSchema>;

export const isUserMember = (obj: unknown): obj is UserMember => {
  const isSuccess = userMemberSchema.safeParse(obj).success;

  if (!isSuccess) {
    console.warn("Invalid user member");
    return false;
  }
  return true;
};

// ----- SINGLE RESPONSES (/entity/{id}) -----
export const singleUserResponseSchema = userMemberSchema.extend({
  "@context": z.string(),
});

export type SingleUserResponse = z.infer<typeof singleUserResponseSchema>;

export const isSingleUserResponse = (obj: unknown): obj is SingleUserResponse => {
  const isSuccess = singleUserResponseSchema.safeParse(obj).success;

  if (!isSuccess) {
    console.warn("Invalid single user response");
    return false;
  }
  return true;
};

// ----- CUSTOM RESPONSE FROM /api/me ROUTE FOR AUTH CHECK -----
export const meResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  roles: z.array(z.string()),
});

export type MeResponse = z.infer<typeof meResponseSchema>;

export const isMeResponse = (obj: unknown): obj is MeResponse => {
  const isSuccess = meResponseSchema.safeParse(obj).success;

  if (!isSuccess) {
    console.warn("Invalid response", obj);
    return false;
  }
  return true;
};
