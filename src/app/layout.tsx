import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/providers";
import { DevMenu } from "@/components/dev/DevMenu";
import Link from "next/link";
import { ReactQueryDevtools } from "@/providers/react-query-provider";
import { ThemeToggle } from "@/components/micro/ThemeToggle";
import { Routes } from "@/config/routes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={`${inter.className}`}>
        <Providers>
          {children}

          <DevMenu>
            <div className="flex flex-col gap-1 text-sm font-medium underline">
              {Object.keys(Routes).map((key) => {
                return (
                  <Link key={key} href={Routes[key as keyof typeof Routes]}>
                    {key}
                  </Link>
                );
              })}
            </div>
            <ThemeToggle />
          </DevMenu>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
