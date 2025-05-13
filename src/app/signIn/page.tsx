// @ts-nocheck

'use client';

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "@/lib/feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import Cookies from 'js-cookie';
import { useLoginMutation } from "@/lib/feature/auth/auththunk";

interface LoginError {
  status?: number;
  data?: {
    message?: string;
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const hasRedirectedRef = useRef(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Read the token once on mount
  const [localToken, setLocalToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    setLocalToken(tokenFromCookie);
  }, []);

  // // Redirect if already authenticated or token exists
  // useEffect(() => {
  //   if (!hasRedirectedRef.current && (localToken || isAuthenticated)) {
  //     hasRedirectedRef.current = true;
  //     router.replace('/dashboard');
  //   }
  // }, [localToken, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const loadingToastId = toast.loading("Logging in...");
      const userData = await login({ email, password }).unwrap();

      toast.dismiss(loadingToastId);

      if (userData && userData.token) {
        Cookies.set('token', userData.token);
        dispatch(setCredentials(userData));

        toast.success("Login successful!", {
          autoClose: 2000,
          onClose: () => {
            router.push("/dashboard");
          },
        });
      } else {
        toast.error("Invalid login response");
      }
    } catch (error) {
      const err = error as LoginError;
      console.error('Login Error:', err);

      if (err?.status === 404) {
        toast.error("User not found, please sign up");
      } else if (err?.status === 401 || err?.status === 400) {
        toast.error("Invalid email or password");
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Login failed. Please try again");
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-0 max-w-5xl w-full shadow-md">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox={showPassword ? "0 0 640 512" : "0 0 128 128"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45z" />
                    ) : (
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    )}
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">Remember me</label>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-[#f97316] hover:bg-primary focus:outline-none"
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">
                Don’t have an account
                <a href="/signUp" className="text-[#f97316] font-semibold hover:underline ml-1">Register here</a>
              </p>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] hidden md:block">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full object-cover" alt="Login" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
