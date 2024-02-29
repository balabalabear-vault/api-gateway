"use client"

import { createContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const MediaContext = createContext({
  isDesktop: true,
  isMobile: false,
});


export function ResponsiveProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mediaSize, setMediaSize] = useState({
    isDesktop: true,
    isMobile: false,
  });
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)'
  })

  useEffect(() => {
    if(isDesktop) setMediaSize({ isDesktop: true, isMobile: false });
    else setMediaSize({ isDesktop: false, isMobile: true })
  }, [isDesktop])



  return (
    <MediaContext.Provider value={mediaSize}>
      {children}
    </MediaContext.Provider>
  )
}