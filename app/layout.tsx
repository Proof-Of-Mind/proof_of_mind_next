import "./css/style.css";

import { Inter } from "next/font/google";

import { ConnectProvider } from "@/components/provider/ConnectProvider";
import { ModalProvider } from "@/components/provider/ModalProvider";
import Header from "@/components/ui/header";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Script
        src="https://www.google.com/recaptcha/api.js?hl=en"
        async
        defer
      ></Script> */}
      <Script src="https://js.hcaptcha.com/1/api.js?hl=en" async defer></Script>
      <body
        className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Toaster />
          <ConnectProvider>
            <ModalProvider>
              <Header />
              {children}
            </ModalProvider>
          </ConnectProvider>
        </div>
      </body>
    </html>
  );
}
