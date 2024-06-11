"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();
export const QueryContext = createContext({});

export function MyQueryClientProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}