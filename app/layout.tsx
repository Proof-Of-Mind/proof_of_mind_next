import "./css/style.css";

import { Inter } from "next/font/google";

import { ConnectProvider } from "@/components/provider/ConnectProvider";
import { LoadingProvider } from "@/components/provider/LoadingProvider";
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
  title: "Proof Of Mind",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="gt4.js"></Script>
      {/* <Script src="https://js.hcaptcha.com/1/api.js?hl=en" async defer></Script> */}
      {/* <Script src="https://www.google.com/recaptcha/api.js?render=6LcdEEQpAAAAAEZ8-HhtKB7ooZuMRzlkQoBNW1-B"></Script> */}
      <body
        className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Toaster />
          <ConnectProvider>
            <LoadingProvider>
              <ModalProvider>
                <Header />
                {children}
              </ModalProvider>
            </LoadingProvider>
          </ConnectProvider>
        </div>
      </body>
    </html>
  );
}
