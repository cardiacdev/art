import { render, screen } from "@testing-library/react";

import { ThemeToggle } from "@/components/theme-toggle";

describe("ThemeToggle", () => {
  test("1. The ThemeToggle component renders", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /Toggle theme/i });
    const sunIcon = screen.getByTestId("sun-icon");
    const moonIcon = screen.getByTestId("moon-icon");

    expect(button).toBeDefined();
    expect(sunIcon).toBeDefined();
    expect(moonIcon).toBeDefined();
  });
});
