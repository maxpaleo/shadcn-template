import * as React from "react";
import ThemeProvider from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ModalProvider } from "@/hooks/use-modal";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <NuqsAdapter>
          <ModalProvider>
            {children}
            <Toaster />
          </ModalProvider>
        </NuqsAdapter>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
