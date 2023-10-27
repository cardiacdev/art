import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function falsyValueReplacer(key: string, value: any) {
  if (!value) return undefined;
  return value;
}

// See: https://github.com/orgs/react-hook-form/discussions/1991
export function getDirtyFormValues<
  DirtyFields extends Record<string, unknown>,
  Values extends Record<keyof DirtyFields, unknown>,
>(dirtyFields: DirtyFields, values: Values): Partial<typeof values> {
  const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
    // Unsure when RFH sets this to `false`, but omit the field if so.
    if (!dirtyFields[key]) return prev;

    return {
      ...prev,
      [key]:
        typeof dirtyFields[key] === "object"
          ? getDirtyFormValues(dirtyFields[key] as DirtyFields, values[key] as Values)
          : values[key],
    };
  }, {});

  return dirtyValues;
}

export function iriToId(iri: string) {
  return iri.split("/").pop();
}
