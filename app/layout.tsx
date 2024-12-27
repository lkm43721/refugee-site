import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Topbar from "@/app/topbar";

const pretendard = localFont({
    src: './fonts/PretendardVariable.woff2',
    variable: "--font-pretendard"
})

export const metadata: Metadata = {
  title: "Refugee Outreach Service",
  description: "Refugee Outreach Service",
  icons: {
		icon: "icon.svg",
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
        className={`${pretendard.variable} antialiased`}
      >
      <Topbar/>
        {children}
      </body>
    </html>
  );
}
