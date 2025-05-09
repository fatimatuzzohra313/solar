// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Settings,
  Menu,
  X,
  User,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Package,
  Home,
  BookOpen,
  Store,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useLogoutMutation } from "@/lib/feature/auth/auththunk";
import { logout } from "@/lib/feature/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // Add this import

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState("");

  const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter(); // Use router instead of navigate for consistency
  const dispatch = useDispatch(); // Add dispatch hook

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const currentPath = usePathname();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      await logoutApi().unwrap();

      // Clear the Redux store
      dispatch(logout());

      router.push("/signIn");
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(logout());
      router.push("/signIn");
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  const MenuItem = ({ href, icon: Icon, label, isActive, onClick }) => (
    <Link
      href={href}
      className={`flex items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200 ${
        isActive
          ? "bg-orange-50 text-orange-500"
          : "text-gray-700 hover:bg-orange-50/50 hover:text-orange-500"
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="flex-1 font-medium">{label}</span>
      {onClick && <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${expandedSection === label ? "rotate-90" : ""}`} />}
    </Link>
  );

  return (
    <>
      <header className="w-full flex-col">
        <div className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between px-4 py-3 md:px-11 md:py-7">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <svg
                  className="h-6 w-25 md:h-9 md:w-44"
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
                    <path
                      className="cls-2"
                      d="M49.35 151.36H98.7v49.35H49.35z"
                    ></path>
                  </g>
                </svg>{" "}
              </Link>
            </div>

            {/* Search Section - Hidden on mobile, shown on md and up */}
            <div className="mx-8 hidden max-w-2xl flex-grow md:flex ">
              <div className="relative w-full ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Type for search"
                  className="w-full rounded-full border-none bg-[#fef7f3] py-3 pl-10 pr-4 text-gray-700 focus:bg-white focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile Search Button */}
              <button className="hidden rounded-full bg-[#f7f7f7] p-2 md:block ">
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              <button className=" rounded-full bg-[#f7f7f7] p-2">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>

              <button className="relative rounded-full bg-[#f7f7f7] p-2">
                <Bell className="h-5 w-5 text-primary md:h-6 md:w-6" />
                <span className="bg-red-500 absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full text-xs text-white md:h-4 md:w-4">
                  2
                </span>
              </button>

              <button className="flex items-center">
                <img
                  src="/api/placeholder/32/32"
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-gray-200 md:h-10 md:w-10"
                />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2 p-2 md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search - Only visible when screen is small */}
          <div className="px-4 pb-3 md:hidden">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Type for search"
                className="w-full rounded-full border-none bg-[#f7f7f7] py-2 pl-10 pr-4 text-gray-700 focus:bg-white focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="mx-4 mt-4 hidden items-center justify-between rounded-2xl bg-[#fef7f3] px-6 py-4.5 shadow-sm md:mx-11 md:flex">
          {/* Navigation Links */}
          <div className="flex space-x-9">
            <Link
              href="/dashboard"
              className={`${
                currentPath === "/dashboard/"
                  ? "border-b-4 border-orange-500 font-semibold text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              } pb-1`}
            >
              Dashboard
            </Link>

            <Link
              href="/user-guide"
              className={`${
                currentPath === "/user-guide"
                  ? "border-b-4 border-orange-500 font-semibold text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              } pb-1`}
            >
              User Guide
            </Link>
            {/* My Account Dropdown */}
            <div className="relative -mt-2" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center space-x-2 rounded-md px-4 py-2 transition-all duration-200 ease-in-out
          ${
            currentPath === "/accountDeatils/sell/"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
          }`}
              >
                <span className="font-medium">My Account</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right scale-100 transform rounded-lg bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200">
                  <div className="py-1">
                    <Link
                      href="/accountDeatils/sell"
                      className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Need To Sell</span>
                    </Link>
                    <Link
                      href="/accountDeatils/sell"
                      className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Need To Buy</span>
                    </Link>
                    <Link
                      href="/accountDeatils/UserTable"
                      className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <Package className="h-4 w-4" />
                      <span>My Inventory</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/market"
              className={`${
                currentPath === "/market/"
                  ? "border-b-4 border-orange-500 font-semibold text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              } pb-1`}
            >
              Market
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-orange-500 hover:text-orange-600"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z"
                fill="#F6660D"
              />
              <path
                d="M4.55994 11.25L6.62994 9.18C6.77994 9.03 6.84994 8.84 6.84994 8.65C6.84994 8.46 6.77994 8.26 6.62994 8.12C6.33994 7.83 5.85994 7.83 5.56994 8.12L2.21994 11.47C1.92994 11.76 1.92994 12.24 2.21994 12.53L5.56994 15.88C5.85994 16.17 6.33994 16.17 6.62994 15.88C6.91994 15.59 6.91994 15.11 6.62994 14.82L4.55994 12.75H8.99994V11.25H4.55994Z"
                fill="#F6660D"
              />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </header>

   

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-[400px] transform bg-white shadow-2xl transition-all duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
             
               
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="h-[calc(100vh-144px)] overflow-y-auto px-4 py-6">
              <nav className="space-y-2">
                <MenuItem
                  href="/dashboard"
                  icon={Home}
                  label="Dashboard"
                  isActive={currentPath === "/dashboard"}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                
                <MenuItem
                  href="/user-guide"
                  icon={BookOpen}
                  label="User Guide"
                  isActive={currentPath === "/user-guide"}
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* My Account Section */}
                <div className="relative space-y-2">
                  <button
                    onClick={() => toggleSection("My Account")}
                    className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-orange-50/50 hover:text-orange-500"
                  >
                    <User className="h-5 w-5" />
                    <span className="flex-1 font-medium pl-12 ">My Account</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                      expandedSection === "My Account" ? "rotate-180" : ""
                    }`} />
                  </button>

                  {expandedSection === "My Account" && (
                    <div className="ml-4 space-y-1 border-l-2 border-orange-100 pl-4">
                      <Link
                        href="/accountDeatils/sell"
                        className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Need To Sell</span>
                      </Link>
                      <Link
                        href="/accountDeatils/buy"
                        className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Package className="h-5 w-5" />
                        <span>Need To Buy</span>
                      </Link>
                      <Link
                        href="/accountDeatils/UserTable"
                        className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Store className="h-5 w-5" />
                        <span>My Inventory</span>
                      </Link>
                    </div>
                  )}
                </div>

                <MenuItem
                  href="/market"
                  icon={Store}
                  label="Market"
                  isActive={currentPath === "/market"}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 border-t bg-white/90 p-4 backdrop-blur-sm">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-orange-50 px-4 py-3 font-medium text-orange-500 transition-colors hover:bg-orange-100"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
