import type { Metadata } from "next";
import Root from "./root";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicare",
  description: "A Health Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Root>{children}</Root>;
}
