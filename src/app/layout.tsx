import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gramify",
  description: "Gramify social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} dark:bg-n-8 bg-neutral-200 dark:text-white text-n-7`}>
          <Providers>
            <div className="dark:bg-n-7/90 bg-n-1/70 backdrop-blur shadow-sm fixed top-0 left-0 z-50 w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              <Navbar />
            </div>
            <div className="bg-slate-100 dark:bg-n-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-[6rem]">{children}</div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
