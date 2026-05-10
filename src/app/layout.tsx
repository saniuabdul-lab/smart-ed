import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMART-ED — AI-Powered School Planning",
  description: "AI-Powered Curriculum and Lesson Planning for Nigerian Schools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}