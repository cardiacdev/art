import { z } from "zod";

import { createHydraCollectionSchema, createHydraMemberSchema } from "./hydra";

const embeddedProjectSchema = createHydraMemberSchema(
  z.object({
    name: z.string(),
  }),
);

// ----- STANDARD FIELDS -----
export const taskResponseSchema = z.object({
  title: z.string(),
  reference: z.string().optional(),
  euroAmount: z.string().optional(),
  externalHours: z.string().optional(),
  remarks: z.string().optional(),
  plannedCompletionDate: z.string().optional(),
  firstSandboxDeploymentDate: z.string().optional(),
  firstLiveDeploymentDate: z.string().optional(),
  orderNumber: z.string().optional(),
  orderConfirmationDate: z.string().optional(),
  project: embeddedProjectSchema,
  invoiceItems: z.array(z.string()),
});

export type TaskResponse = z.infer<typeof taskResponseSchema>;

// ----- COLLECTIONS -----
export const taskCollectionResponseSchema = createHydraCollectionSchema(taskResponseSchema);

export type TaskCollectionResponse = z.infer<typeof taskCollectionResponseSchema>;

export const isTaskCollectionResponse = (obj: unknown): obj is TaskCollectionResponse => taskCollectionResponseSchema.safeParse(obj).success;

// ----- COLLECTION  MEMBERS -----
export const taskMemberSchema = createHydraMemberSchema(taskResponseSchema);

export type TaskMember = z.infer<typeof taskMemberSchema>;

export const isTaskMember = (obj: unknown): obj is TaskMember => taskMemberSchema.safeParse(obj).success;

// ----- SINGLE RESPONSES (/entity/{id}) -----
export const singleTaskResponseSchema = taskMemberSchema.extend({
  "@context": z.string(),
});

export type SingleTaskResponse = z.infer<typeof singleTaskResponseSchema>;

export const isSingleTaskResponse = (obj: unknown): obj is SingleTaskResponse =>
  singleTaskResponseSchema.safeParse(obj).success;
