import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetCurrentUserQuery } from "@/lib/feature/auth/auththunk";
import { User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  console.log(
    "Auth State:",
    useSelector((state: RootState) => state.auth),
  );
  const { isLoading } = useGetCurrentUserQuery();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 flex h-[80px] items-center justify-between bg-[#fef7f3] p-9 py-12 md:h-[134px]">
      {/* Logo Section */}
      <div className="-ml-3 -mt-3 flex items-center justify-start md:ml-3">
        <svg
          className="h-9 w-44"
          viewBox="0 0 892.39 200.7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>{".cls-2{stroke-width:0;fill:#161e3c}"}</style>
          </defs>
          <g data-name="Layer 1">
            <path
              className="cls-2"
              d="M361.89 51.9h-36.87v113.82h-18.44V51.9h-36.87V34.03h92.18V51.9Zm-11.29 64.72c0-30.1 15.61-45.34 39.51-45.34h1.88v17.87h-1.88c-13.55 0-21.07 8.84-21.07 27.47v49.1H350.6v-49.1Zm94.63-46.47c26.15-.56 48.91 22.39 48.35 48.54v47.03h-18.44v-14.86c-4.52 9.22-16.93 16.37-29.91 16.37-26.15.56-49.1-22.39-48.54-48.54-.56-26.15 22.39-49.1 48.54-48.54Zm.19 17.87c-17.12 0-30.29 13.55-30.29 30.67s13.36 30.66 30.29 30.66 29.91-13.54 29.91-30.66-12.79-30.67-29.91-30.67Zm58.5 30.67c-.56-26.15 22.39-49.1 48.54-48.54 12.23 0 22.39 5.08 29.72 13.54V34.02h18.62v84.66c.56 26.15-22.2 49.1-48.35 48.54-26.15.56-49.1-22.39-48.54-48.54Zm48.54 30.66c16.93 0 30.1-13.54 30.1-30.66s-13.17-30.67-30.1-30.67-30.1 13.55-30.1 30.67 13.17 30.66 30.1 30.66ZM627.14 36.1c6.21 0 11.1 5.08 11.1 11.29s-4.89 11.29-11.1 11.29-11.29-5.08-11.29-11.29c0-6.58 5.08-11.29 11.29-11.29Zm-9.22 35.56h18.44v94.06h-18.44V71.66Zm43.83 17.87h-14.11V71.66h14.49c2.07-23.33 15.61-37.25 38.38-38.19v17.87c-11.29 1.32-19.19 8.28-19.94 20.32h19.94v17.87h-20.32v76.19h-18.44V89.53Zm61.14-53.43c6.21 0 11.1 5.08 11.1 11.29s-4.89 11.29-11.1 11.29-11.29-5.08-11.29-11.29c0-6.58 5.08-11.29 11.29-11.29Zm-9.21 35.56h18.44v94.06h-18.44V71.66ZM840.66 117c0 3.2-.19 6.02-.56 8.47h-76c1.51 14.11 12.98 23.89 28.03 23.89 9.22 0 16.74-3.2 22.58-9.41l22.01.19c-8.28 16.37-25.21 27.09-44.02 27.09-26.53.56-48.91-22.2-48.35-48.35-.56-26.15 21.63-49.29 47.78-48.73 24.46 0 47.78 18.44 48.54 46.84Zm-19.76-6.59c-3.57-12.98-14.86-22.39-28.22-22.39-14.3 0-25.02 9.03-28.6 22.39h56.82Zm30.1 6.21c0-30.1 15.61-45.34 39.51-45.34h1.88v17.87h-1.88c-13.55 0-21.07 8.84-21.07 27.47v49.1H851v-49.1Z"
            ></path>
            <path
              d="m214.27 48.16-57.79 27.52V48.16H0V0h214.27v48.16zm-57.79 75.68-57.79 27.52v-27.52H49.35V75.68h107.13v48.16z"
              style={{ fill: "#f6660d", strokeWidth: 0 }}
            ></path>
            <path className="cls-2" d="M49.35 151.36H98.7v49.35H49.35z"></path>
          </g>
        </svg>{" "}
      </div>

      {/* Desktop Navigation */}
      <div className="mr-8 hidden items-center space-x-8 md:flex">
        <nav className="-mt-2 flex space-x-9 text-lg text-[#000000]">
          <Link
            href="/"
            className={`${
              currentPath === "/"
                ? "border-b-4 border-primary font-semibold text-primary"
                : "hover:text-primary"
            } pb-1`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${
              currentPath === "/about/"
                ? "border-b-4 border-primary font-semibold text-primary"
                : "hover:text-primary"
            } pb-1`}
          >
            About
          </Link>
          <Link
            href="/membership"
            className={`${
              currentPath === "/membership/"
                ? "border-b-4 border-primary font-semibold text-primary"
                : "hover:text-primary"
            } pb-1`}
          >
            Membership
          </Link>
          <Link
            href="/demoS"
            className={`${
              currentPath === "/demoS/"
                ? "border-b-4 border-primary font-semibold text-primary"
                : "hover:text-primary"
            } pb-1`}
          >
            Demo
          </Link>
          <div className="flex items-center -mt-2">
            {isLoading ? (
              <div className="h-6 w-24 animate-pulse rounded bg-gray-700"></div>
            ) : isAuthenticated ? (
              <div className="group relative z-50">
                <Link href="/dashboard" className="flex items-center space-x-2 transition-colors hover:text-[#f97316]" >
                  
                  <User className="h-5 w-5" />
                  <span>{user?.firstName || "My Account"}</span>
                </Link>
                <div className="absolute right-0 mt-2 hidden w-48 rounded-md bg-white py-1 shadow-lg group-hover:block"></div>
              </div>
            ) : (
              <Link
                href="/signIn"
                className="transition-colors hover:text-[#f97316]"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
        <Link href="/signUp">
          <button className="-mt-1.5 rounded-full bg-[#161e3c] px-10 py-3.5 text-xl font-medium text-white transition-colors hover:bg-primary">
            Free Sign Up
          </button>
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="flex items-center justify-center md:hidden "
        onClick={toggleMenu}
      >
        <div className="group relative">
          <div
            className={`relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-xl transition-all ${
              isOpen ? "bg-primary" : "bg-[#161e3c]"
            } ring-0 duration-200 group-focus:ring-4`}
          >
            <div
              className={`flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300 ${
                isOpen ? "translate-y-1" : ""
              }`}
            >
              {/* Hamburger Lines */}
              <div
                className={`h-[2px] w-7 origin-left transform bg-white transition-all duration-300 ${
                  isOpen ? "h-2 translate-y-6 opacity-0 delay-100" : ""
                }`}
              ></div>
              <div
                className={`h-[2px] w-7 transform rounded bg-white transition-all duration-300 ${
                  isOpen ? "h-2 translate-y-6 opacity-0 delay-75" : ""
                }`}
              ></div>
              <div
                className={`h-[2px] w-7 origin-left transform bg-white transition-all duration-300 ${
                  isOpen ? "h-1 translate-y-6 opacity-0" : ""
                }`}
              ></div>

              {/* Cross Lines */}
              <div
                className={`absolute top-2.5 transform items-center justify-between transition-all duration-500 ${
                  isOpen ? "translate-x-0" : "-translate-x-10"
                } flex w-0 ${isOpen ? "w-12" : ""}`}
              >
                <div
                  className={`absolute h-[2px] w-5 transform bg-white transition-all duration-500 ${
                    isOpen ? "rotate-45 delay-300" : ""
                  }`}
                ></div>
                <div
                  className={`absolute h-[2px] w-5 transform bg-white transition-all duration-500 ${
                    isOpen ? "-rotate-45 delay-300" : ""
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Mobile Sidebar */}
      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className={`fixed right-0 top-24 z-50 mr-5 flex h-[270px] w-[231px] transform flex-col items-start rounded-3xl bg-[#161e3c] p-4 text-white transition-all duration-1000 ease-in-out md:hidden ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <nav className="flex w-full flex-col space-y-2.5 text-lg">
            <Link href="/" onClick={toggleMenu} className="w-full">
              Home
            </Link>
            <Link href="/about" onClick={toggleMenu} className="w-full">
              About
            </Link>
            <Link href="/membership" onClick={toggleMenu} className="w-full">
              Membership
            </Link>
            <Link href="/demoS" onClick={toggleMenu} className="w-full">
              Demo
            </Link>
            <Link
              href="/signIn"
              onClick={toggleMenu}
              className="w-full font-semibold"
            >
              Sign in
            </Link>
            <Link href="/signUp" onClick={toggleMenu} className="w-full">
              <button className="mt-1 rounded-3xl bg-orange-500 px-6 py-2 font-bold text-white">
                Free Sign Up
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
