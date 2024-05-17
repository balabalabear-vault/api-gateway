import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import NextUIProvider from "./providers/NextUi/index";
import QueryClientProvider from "./providers/TanstackReactQuery/index";
import ResponsiveProvider from "./providers/Responsive";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: 'rgb(30 41 59)' }}>
      <head>
      <script src="http://localhost:3000"></script>
      </head>
        <NextUIProvider>
          <QueryClientProvider>
            <ResponsiveProvider>
              <body className={`${inter.className} antialiased bg-slate-800`}>
                {children}
              </body>
            </ResponsiveProvider>
          </QueryClientProvider>
        </NextUIProvider>
      </html>
  );
}
