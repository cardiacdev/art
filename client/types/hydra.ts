import { AnyZodObject, z } from "zod";

export const jsonLdMetaSchema = z.object({
  "@id": z.string(),
  "@type": z.string(),
});

export type JsonLdMeta = z.infer<typeof jsonLdMetaSchema>;

export const hydraViewSchema = jsonLdMetaSchema.extend({
  "hydra:first": z.string(),
  "hydra:last": z.string(),
  "hydra:next": z.string().optional(),
});

export type HydraView = z.infer<typeof hydraViewSchema>;

export interface HydraCollection<T> extends JsonLdMeta {
  "@context": string;
  "hydra:totalItems": number;
  "hydra:member": Array<T & JsonLdMeta>;
  "hydra:view"?: HydraView;
}

export function createHydraMemberSchema<T extends AnyZodObject>(schema: T) {
  return jsonLdMetaSchema.merge(schema);
}

export function createHydraCollectionSchema<T extends AnyZodObject>(schema: T) {
  return jsonLdMetaSchema.extend({
    "hydra:totalItems": z.number(),
    "hydra:member": z.array(jsonLdMetaSchema.merge(schema)),
    "hydra:view": hydraViewSchema.optional(),
  });
}
