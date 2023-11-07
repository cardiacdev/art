import { useState } from "react";

import { useClientsQuery } from "@/hooks/queries/clients/use-clients-query";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ControllerRenderProps, UseFormSetValue } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { CreateProjectFormValues } from "./create-project-dialog";

interface ClientPopoverFieldProps {
  field: ControllerRenderProps<CreateProjectFormValues, "client">;
  setFormValue: UseFormSetValue<CreateProjectFormValues>;
}

export const ClientPopoverField = ({ field, setFormValue }: ClientPopoverFieldProps) => {
  const [open, setOpen] = useState(false);
  const params = new URLSearchParams();
  params.append("pagination", "false");
  const { data } = useClientsQuery(params);

  if (!data) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn("h-auto w-[250px] justify-between", !field.value && "text-muted-foreground")}>
            {field.value
              ? data["hydra:member"].find((client) => client["@id"] === field.value)?.name
              : "Kunde auswählen"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" withoutPortal>
        <Command>
          <CommandInput placeholder="Kunde suchen..." className="h-9" />
          <ScrollArea className="h-72">
            <CommandEmpty>Kein Kunde gefunden.</CommandEmpty>
            <CommandGroup>
              {data["hydra:member"].map((client) => (
                <CommandItem
                  className="cursor-pointer"
                  value={client.name}
                  key={client["@id"]}
                  onSelect={() => {
                    setFormValue("client", client["@id"], { shouldDirty: true });
                    setOpen(false);
                  }}>
                  {client.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      client["@id"] === field.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
