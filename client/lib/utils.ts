import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

import { SearchParams } from "@/types/utils";

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
  Values extends Partial<Record<keyof DirtyFields, unknown>>,
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

export function commaToDot(str?: string) {
  if (!str) return "";
  return str.replace(",", ".");
}

export function dotToComma(str?: string) {
  if (!str) return "";
  return str.replace(".", ",");
}

export function isIri(str?: string) {
  if (!str) return false;
  return str.startsWith("/");
}

export function iriToId(iri: string) {
  return iri.split("/").pop() ?? "";
}

export function trimString(str?: string, maxLength = 50) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

export function URLSearchParamsToObj(searchParams: SearchParams) {
  if (!searchParams) return {};

  if (typeof searchParams === "string") {
    return Object.fromEntries(new URLSearchParams(searchParams).entries());
  }

  if (Array.isArray(searchParams)) {
    return Object.fromEntries(searchParams);
  }

  if (searchParams instanceof URLSearchParams) {
    return Object.fromEntries(searchParams.entries());
  }

  return searchParams;
}

export function dateToFormat(date: Date, formatString: string = "PP") {
  return format(date, formatString);
}

export function isoToFormat(iso: string, formatString: string = "PP") {
  return format(parseISO(iso), formatString);
}
