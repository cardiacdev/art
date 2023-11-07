import { render, screen, within } from "@testing-library/react";

import Hero from "@/app/page";

describe("Hero", () => {
  test("1. The Hero component renders", () => {
    render(<Hero />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: /BART/i })).toBeDefined();
  });
});
