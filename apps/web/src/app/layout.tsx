import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Shell } from "../components/Shell/Shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpaceX S-1 Interactive",
  description: "A source-bound interactive visualization of SpaceX's May 2026 Form S-1.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Shell />
        {children}
      </body>
    </html>
  );
}
