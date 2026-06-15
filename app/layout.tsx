import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; 
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanly Teklip",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tk"
      className={`${GeistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}