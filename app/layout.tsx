import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import Navbar from "./components/Navbar";
import NextUIProvider from "./providers/NextUi/index";
import QueryClientProvider from "./providers/TanstackReactQuery/index";

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
    <html lang="en">
      <head>
      <script src="http://localhost:3000"></script>
      </head>
        <body className={`${inter.className} antialiased`}>
          <NextUIProvider>
            <QueryClientProvider>
              <Navbar />
              {children}
            </QueryClientProvider>
          </NextUIProvider>
        </body>
      </html>
  );
}
