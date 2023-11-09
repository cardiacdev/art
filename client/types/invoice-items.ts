import { z } from "zod";

import { createHydraMemberSchema } from "./hydra";

const embeddedInvoiceSchema = createHydraMemberSchema(
  z.object({
    invoiceNumber: z.string(),
  }),
);
export const invoiceItemResponseSchema = z.object({
  euroAmount: z.string(),
  task: z.string(),
  invoice: embeddedInvoiceSchema,
});
