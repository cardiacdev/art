import { useState } from "react";

import { toast } from "sonner";

import { isConstraintViolationListResponse } from "@/types/hydra";

export type Violation = {
  message: string;
};

type PropertyViolations = {
  [key: string]: Array<Violation>;
};

type GlobalViolations = {
  global: Array<Violation>;
};

export type Violations = PropertyViolations & GlobalViolations;

export const useHandleMutationErrors = () => {
  const [violations, setViolations] = useState<Violations>({ global: [] });

  const processResponse = (res: any) => {
    if (!res.status || res.status < 300) return;
    if (res.status === 404) {
      toast.error("Ressource nicht gefunden");
      throw new Error("Ressource nicht gefunden");
    }
    if (res.status === 401) {
      toast.error("Sie sind nicht berechtigt, diese Aktion auszuführen.");
      throw new Error("Sie sind nicht berechtigt, diese Aktion auszuführen.");
    }
    if (isConstraintViolationListResponse(res)) {
      const responseViolations: Violations = { global: [] };
      res.violations.forEach((violation: any) => {
        const propertyPath = violation.propertyPath;
        const message = String(violation.message) || "Unbekannter Fehler";

        if (propertyPath) {
          if (!responseViolations[propertyPath]) {
            responseViolations[propertyPath] = [{ message }];
          } else {
            responseViolations[propertyPath]?.push({ message });
          }
        } else {
          if (!responseViolations.global) {
            responseViolations.global = [{ message }];
          }
          responseViolations.global.push({ message });
        }
      });
      setViolations(responseViolations);
      throw new Error(res.detail);
    }

    toast.error("Ein unbekannter Fehler ist aufgetreten.");
    throw new Error("Ein unbekannter Fehler ist aufgetreten.");
  };

  const resetViolations = () => {
    setViolations({ global: [] });
  };

  return {
    violations,
    resetViolations,
    processResponse,
  };
};
