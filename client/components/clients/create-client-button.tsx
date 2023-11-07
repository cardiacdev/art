"use client";

import { useModal } from "@ebay/nice-modal-react";

import { Button } from "../ui/button";
import { CreateClientDialog } from "./create-client-dialog";

export const CreateClientButton = () => {
  const modal = useModal(CreateClientDialog);
  return (
    <Button variant="default" className="ml-auto" onClick={() => modal.show()}>
      Kunde anlegen
    </Button>
  );
};
