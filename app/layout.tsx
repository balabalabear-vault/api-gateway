import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import QueryClientProvider from "./providers/TanstackReactQuery/index";
import ResponsiveProvider from "./providers/Responsive";
import NextUIProvider from "./providers/NextUi/NextUIProvider";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "My Vault",
  description: "Welcome to Jack Kwok's vault"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: 'rgb(30 41 59)' }}>
      <head>
      </head>
      <body className={`${inter.className} antialiased bg-slate-800 min-h-screen`}>
        <NextUIProvider>
          <QueryClientProvider>
            <ResponsiveProvider>
              <div className="min-h-screen">
                <NavBar />
                {children}
              </div>
            </ResponsiveProvider>
         </QueryClientProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}
