import { z } from "zod";

import { createHydraCollectionSchema, createHydraMemberSchema } from "./hydra";

// ----- STANDARD FIELDS -----
export const clientResponseSchema = z.object({
  name: z.string(),
  projects: z.array(z.string()).optional(),
  invoices: z.array(z.string()).optional(),
});

export type ClientResponse = z.infer<typeof clientResponseSchema>;

// ----- COLLECTIONS -----
export const clientCollectionResponseSchema = createHydraCollectionSchema(clientResponseSchema);

export type ClientCollectionResponse = z.infer<typeof clientCollectionResponseSchema>;

export const isClientCollectionResponse = (obj: unknown): obj is ClientCollectionResponse =>
  clientCollectionResponseSchema.safeParse(obj).success;

// ----- COLLECTION  MEMBERS -----
export const clientMemberSchema = createHydraMemberSchema(clientResponseSchema);

export type ClientMember = z.infer<typeof clientMemberSchema>;

export const isClientMember = (obj: unknown): obj is ClientMember =>
  clientMemberSchema.safeParse(obj).success;

// ----- SINGLE RESPONSES (/entity/{id}) -----
export const singleClientResponseSchema = clientMemberSchema.extend({
  "@context": z.string(),
});

export type SingleClientResponse = z.infer<typeof singleClientResponseSchema>;

export const isSingleClientResponse = (obj: unknown): obj is SingleClientResponse =>
  singleClientResponseSchema.safeParse(obj).success;
