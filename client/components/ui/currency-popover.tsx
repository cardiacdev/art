import { DotFilledIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const CurrencyPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <QuestionMarkCircledIcon className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className="text-sm" align="start">
        <span className="font-medium">Akzeptierte Formate:</span>
        <ul className="list-inside list-disc py-2">
          <li>
            <span className="font-mono">123,45</span> oder <span className="font-mono">12,3</span>
          </li>
          <li>
            <span className="font-mono">123.45</span> oder <span className="font-mono">12.3</span>
          </li>
          <li>
            <span className="font-mono">123</span> oder <span className="font-mono">12</span>
          </li>
        </ul>
        <span className="mt-5">Mehr als zwei Nachkommastellen werden automatisch gerundet.</span>
      </PopoverContent>
    </Popover>
  );
};
