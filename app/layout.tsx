import type { Metadata } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Manan Garg | ML and Software Engineer",
  description:
    "Portfolio of Manan Garg, a computer science student at Bennett University working on computer vision, ML pipelines and full-stack software.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain antialiased min-h-screen flex flex-col bg-paper text-ink">
        <Nav />
        <main className="flex-grow pt-16">{children}</main>
      </body>
    </html>
  );
}
