"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...{
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
        enableColorScheme: true,
        ...props
      }}
    >
      {children}
    </NextThemesProvider>
  );
}