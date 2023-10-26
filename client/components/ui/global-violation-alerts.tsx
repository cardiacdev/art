import { Violation } from "@/hooks/use-handle-mutation-errors";

import { Alert, AlertDescription } from "./alert";

export const GlobalViolationAlerts = ({ violations }: { violations: Violation[] }) => {
  return (
    <div className="space-y-2">
      {violations?.map(({ message }) => (
        <Alert variant={"destructive"} className="">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
