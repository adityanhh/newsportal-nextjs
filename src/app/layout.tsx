import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google"
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"], // Weight yang diinginkan
  subsets: ["latin"],     // Subset karakter yang dibutuhkan
  variable: "--font-roboto", // Nama variabel CSS untuk font
});

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
  title: "Wyn.com",
  description: "Newsportal Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
