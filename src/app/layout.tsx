import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SashaWidget from "@/components/SashaWidget";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Erin Skidds - Full-Stack Engineer",
  description: "Erin Skidds - Full-Stack Engineer specializing in front-end and back-end development, bot development, and language learning models",
  icons: {
    icon: "/assets/favicon.ico",
    apple: "/assets/apple-touch-icon.png",
  },
  other: {
    'cache-control': 'no-cache, no-store, must-revalidate',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://kit.fontawesome.com/4747ecd26b.js" crossOrigin="anonymous" async></script>
      </head>
      <body
        className={`${oswald.variable} ${inter.variable} antialiased`}
      >
        <Header />
        <div id="main-content">
          {children}
        </div>
        <SashaWidget />
      </body>
    </html>
  );
}
