import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { UserMember } from "@/types/users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditUserDialogWithButtonProps {
  user: UserMember;
}

export const EditUserDialog = NiceModal.create(({ user }: EditUserDialogWithButtonProps) => {
  const { visible, show, hide } = useModal();

  return (
    <Dialog open={visible} onOpenChange={(open) => (open ? show() : hide())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Benutzer bearbeiten</DialogTitle>
          <DialogDescription>Bearbeiten Sie die Daten des Benutzers.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
