import { useModal } from "@ebay/nice-modal-react";
import { DotsHorizontalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import { TaskMember } from "@/types/tasks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteTaskDialog } from "@/components/tasks/delete-task-dialog";
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog";

interface TaskActionsMenuProps {
  task: TaskMember;
}

export const TaskActionsMenu = ({ task }: TaskActionsMenuProps) => {
  const editModal = useModal(EditTaskDialog, { task });
  const deleteModal = useModal(DeleteTaskDialog, { task });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Menü öffnen</span>
            <DotsHorizontalIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onSelect={() => editModal.show({ task })}>
            <Pencil1Icon className="mr-1 h-4 w-4" />
            Bearbeiten
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onSelect={() => deleteModal.show({ task })}>
            <TrashIcon className="mr-1 h-4 w-4" />
            Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
