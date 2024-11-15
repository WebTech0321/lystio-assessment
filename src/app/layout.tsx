import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import Providers from "./providers";
import "./globals.css";

const alliance = localFont({
  src: "../assets/fonts/alliance.woff",
  variable: "--font-alliance",
  weight: "300",
});

export const metadata: Metadata = {
  title: "Lystio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alliance.variable} w-full h-screen flex flex-col antialiased bg-[#F6F7F9]`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
