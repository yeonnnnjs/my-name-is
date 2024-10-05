import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "카더가든 이름 생성기",
  description: "내 이름은 카더가든",
  openGraph: {
    title: "키더가든 이름 생성기",
    description: "내 이름은 카더가든",
    url: "https://my-name.kro.kr",
    images: [
      {
        url: "/images/og-image.png",
        width: 400,
        height: 300,
        alt: "",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiasing`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
