import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProviderWrapper from "./ProviderWrapper";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cleanse Text",
  description:
    "Cleanse Text helps you enhance your writing with grammar checks, paraphrasing, and summarization – all in one simple, free, and user-friendly platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <ProviderWrapper>
          <Header />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
