"use client"

import { NextUIProvider } from "@nextui-org/react";
import { createContext } from 'react'
 
export const UIContext = createContext({})
 
export default function UIProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UIContext.Provider value={{}}>
      <NextUIProvider>
        { children}
      </NextUIProvider>
    </UIContext.Provider>
  )
}