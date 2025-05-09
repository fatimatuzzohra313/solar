"use client";

import "@/css/style.css";
import React, { useEffect, useState } from "react";
import StoreProvider from "@/lib/provider/StoreProvider";
import { Poppins } from '@next/font/google';
import ProtectedRoute from "@/components/ProectRoutes/ProtectedRoute";


const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}  className={poppins.className}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <StoreProvider>
          { children}
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
