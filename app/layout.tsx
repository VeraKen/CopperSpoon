import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Copper Spoon | Recipes, Cuisines & Restaurant",
  description: "Discover soulful recipes, global cuisines, and warm restaurant dining at The Copper Spoon.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/copper-spoon-logo.png",
    shortcut: "/copper-spoon-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
