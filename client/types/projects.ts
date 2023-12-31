import { z } from "zod";

import { createHydraCollectionSchema, createHydraMemberSchema } from "./hydra";

const embeddedClientSchema = createHydraMemberSchema(
  z.object({
    name: z.string(),
  }),
);

// ----- STANDARD FIELDS -----
export const projectResponseSchema = z.object({
  name: z.string(),
  hourlyRate: z.string().optional(),
  client: embeddedClientSchema,
});

export type ProjectResponse = z.infer<typeof projectResponseSchema>;

// ----- COLLECTIONS -----
export const projectCollectionResponseSchema = createHydraCollectionSchema(projectResponseSchema);

export type ProjectCollectionResponse = z.infer<typeof projectCollectionResponseSchema>;

export const isProjectCollectionResponse = (obj: unknown): obj is ProjectCollectionResponse =>
  projectCollectionResponseSchema.safeParse(obj).success;

// ----- COLLECTION  MEMBERS -----
export const projectMemberSchema = createHydraMemberSchema(projectResponseSchema);

export type ProjectMember = z.infer<typeof projectMemberSchema>;

export const isProjectMember = (obj: unknown): obj is ProjectMember =>
  projectMemberSchema.safeParse(obj).success;

// ----- SINGLE RESPONSES (/entity/{id}) -----
export const singleProjectResponseSchema = projectMemberSchema.extend({
  "@context": z.string(),
  openTasks: z.number(),
  euroAmount: z.string(),
  billedAmount: z.string(),
  notBilledAmount: z.string(),
});

export type SingleProjectResponse = z.infer<typeof singleProjectResponseSchema>;

export const isSingleProjectResponse = (obj: unknown): obj is SingleProjectResponse =>
  singleProjectResponseSchema.safeParse(obj).success;
