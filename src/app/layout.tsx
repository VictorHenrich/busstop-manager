import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import { AppProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Busstop Manager",
  description: "Bus traffic route management system"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body 
        className={inter.className}
      >
        <AppProviders>
          {children}            
        </AppProviders>
      </body>
    </html>
  );
}
