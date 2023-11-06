"use client";

import { useModal } from "@ebay/nice-modal-react";

import { Button } from "../ui/button";
import { CreateProjectDialog } from "./create-project-dialog";

export const CreateProjectButton = () => {
  const modal = useModal(CreateProjectDialog);
  return (
    <Button variant="default" className="ml-auto" onClick={() => modal.show()}>
      Projekt anlegen
    </Button>
  );
};
