import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNav from "@/components/sidenav";
import NextAuthProvider from "@/providers/nextauth";
import ReduxProvider from "@/providers/redux";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-64">
                <SideNav />
              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12 text-black bg-white">
                {children}
              </div>
            </div>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
