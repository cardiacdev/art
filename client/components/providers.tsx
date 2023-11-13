"use client";

import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setDefaultOptions } from "date-fns";
import { de, enGB } from "date-fns/locale";

import { createQueryClient } from "@/lib/query-client";

import { AuthGuard } from "./auth-guard";
import { ThemeProvider } from "./theme-provider";

if (typeof window !== "undefined") {
  const navigatorLanguage = window.navigator.language;

  const locale = navigatorLanguage === "de-DE" ? de : enGB;

  setDefaultOptions({
    locale,
  });
}

const queryClient = createQueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NiceModal.Provider>
          <AuthGuard>{children}</AuthGuard>
        </NiceModal.Provider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
