"use client";
import React from "react";
import Navbar from "../NavBar";
import Footer from "@/components/Footer";
import ProtectedRoute from "../ProectRoutes/ProtectedRoute";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 
  return (
    <>
      <div>
        <Navbar />
        <div>
          <main>
            <div>{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}