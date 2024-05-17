"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";

const queryClient = new QueryClient();
export const QueryContext = createContext({});

export function MyQueryClientProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </QueryContext.Provider>
  )
}