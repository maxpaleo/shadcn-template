"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const queryClient = new QueryClient();
/**
 * React Query Provider
 * This Provider is used to provide the React Query Client to all components
 * in the application.
 */
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
