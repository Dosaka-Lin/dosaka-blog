import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/ui/ParticleBackground";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dosaka_Lin | Algorithm Engineer",
  description:
    "Dosaka_Lin — Algorithm Engineer & Agent Developer. Codeforces Expert. Exploring the frontier of algorithms and AI agents.",
  keywords: ["Dosaka_Lin", "algorithm", "Codeforces", "agent developer", "blog"],
  openGraph: {
    title: "Dosaka_Lin",
    description: "Algorithm Engineer & Agent Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSerifJP.variable} ${notoSansSC.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ParticleBackground />
          <NavBar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
