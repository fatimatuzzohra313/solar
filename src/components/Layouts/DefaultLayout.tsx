"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { AdminNavbar } from "../AdminNavbar";
import ProtectedRoute from "../ProectRoutes/ProtectedRoute";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="">
      <div className="">

        <ProtectedRoute>
      <AdminNavbar/>

        <Header />
        <main>
          <div className="mx-auto max-w-screen-2xl ">
            {children}
          </div>
        </main>

        </ProtectedRoute>
      </div>
    </div>
  );
}