"use client"

import { NextUIProvider } from "@nextui-org/react";

export function MyNextUIProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextUIProvider> {children} </NextUIProvider>
  )
}