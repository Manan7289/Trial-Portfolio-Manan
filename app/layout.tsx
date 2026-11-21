import type { Metadata } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Providers from "@/components/Providers";
import { GITHUB, LINKEDIN, SITE_URL } from "@/data/site";

const description =
  "Manan Garg builds autonomy software for drones: dronecore, an onboard decision-making and validation engine tested on PX4 and ArduPilot in software-in-the-loop, plus computer vision on drone and satellite imagery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Manan Garg | Robotics and autonomy software",
    template: "%s | Manan Garg",
  },
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Manan Garg",
    title: "Manan Garg | Robotics and autonomy software",
    description,
  },
  twitter: { card: "summary_large_image" },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manan Garg",
  url: SITE_URL,
  jobTitle: "Computer science student, robotics and autonomy software",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bennett University" },
  sameAs: [GITHUB, LINKEDIN],
  knowsAbout: ["UAV autonomy", "MAVLink", "PX4", "ArduPilot", "State estimation", "Path planning", "Computer vision"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain antialiased min-h-screen flex flex-col bg-paper text-ink">
        {/* Without JavaScript the scroll reveals never run: show their end state instead */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}[style*="translateY(105%)"],[style*="scaleX(0)"]{transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 font-mono text-xs uppercase tracking-wider"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main" className="flex-grow pt-16">
            {children}
          </main>
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
