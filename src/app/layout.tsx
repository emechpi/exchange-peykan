"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="h-screen bg-sky overflow-x-hidden">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
