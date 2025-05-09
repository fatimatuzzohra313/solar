// components/AdminNavbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

export const AdminNavbar = () => {
  const pathname = usePathname();
  const auth = useSelector((state: RootState) => state.auth);

  // Simplify the condition and add early return with debug
  if (!auth.isAuthenticated || !auth.user || auth.user.role !== "admin") {
    console.log("AdminNavbar - Render Condition Failed:", {
      isAuthenticated: auth.isAuthenticated,
      hasUser: !!auth.user,
      userRole: auth.user?.role,
    });
    return null;
  }

  if (!auth.isAuthenticated || !auth.user || auth.user.role !== "admin") {
    return null;
  }

  return (
    <nav className="mx-4  items-center justify-between rounded-2xl bg-[#fef7f3] px-6 py-4.5 shadow-sm md:mx-11 md:flex">
      <div className="flex space-x-9">
        <Link
          href="/AllUser"
          className={`${
            pathname === "/admin/dashboard"
              ? "border-b-4 border-orange-500 font-semibold text-orange-500"
              : "text-gray-500 hover:text-orange-500"
          } pb-1`}
        >
          {" "}
          ALL USER
        </Link>
        <Link
          href="/RequestDemo"
          className={`${
            pathname === "/admin/users"
              ? "border-b-4 border-orange-500 font-semibold text-orange-500"
              : "text-gray-500 hover:text-orange-500"
          } pb-1`}
        >
          DEMO REQUEST{" "}
        </Link>
      </div>
    </nav>
  );
};
