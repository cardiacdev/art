"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "./button";

interface PaginationControlsProps {
  page: number;
  pageCount: number;
  first: () => void;
  previous: () => void;
  next: () => void;
  last: () => void;
}

export const PaginationControls = ({
  page,
  pageCount,
  first,
  previous,
  next,
  last,
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button variant="outline" size="sm" onClick={first} disabled={page === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="outline" size="sm" onClick={previous} disabled={page === 1}>
        <CaretLeftIcon />
      </Button>
      <span>{`Seite ${page} von ${pageCount}`}</span>
      <Button variant="outline" size="sm" onClick={next} disabled={page === pageCount}>
        <CaretRightIcon />
      </Button>
      <Button variant="outline" size="sm" onClick={last} disabled={page === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
};
