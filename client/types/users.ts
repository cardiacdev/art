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

export const isUserCollectionResponse = (obj: unknown): obj is UserCollectionResponse =>
  userCollectionResponseSchema.safeParse(obj).success;

// ----- COLLECTION  MEMBERS -----
export const userMemberSchema = createHydraMemberSchema(userResponseSchema);

export type UserMember = z.infer<typeof userMemberSchema>;

export const isUserMember = (obj: unknown): obj is UserMember => userMemberSchema.safeParse(obj).success;

// ----- SINGLE RESPONSES (/entity/{id}) -----
export const singleUserResponseSchema = userMemberSchema.extend({
  "@context": z.string(),
});

export type SingleUserResponse = z.infer<typeof singleUserResponseSchema>;

export const isSingleUserResponse = (obj: unknown): obj is SingleUserResponse =>
  singleUserResponseSchema.safeParse(obj).success;

// ----- CUSTOM RESPONSE FROM /api/me ROUTE FOR AUTH CHECK -----
export const meResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  roles: z.array(z.string()),
});

export type MeResponse = z.infer<typeof meResponseSchema>;

export const isMeResponse = (obj: unknown): obj is MeResponse => meResponseSchema.safeParse(obj).success;
