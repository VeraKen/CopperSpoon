import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Copper Spoon | Global Recipes, Desserts & Lagos Dining",
  description: "Discover soulful recipes, global desserts, original cooking lessons, and memorable Lagos restaurants at The Copper Spoon.",
  icons: {
    icon: "/copper-spoon-logo.png",
    shortcut: "/copper-spoon-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b95125",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
