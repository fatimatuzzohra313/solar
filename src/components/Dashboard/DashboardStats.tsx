// @ts-nocheck

'use client'
import React, { useState, useEffect } from "react";
import { DollarSign, Users, Package, PiggyBank } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalListings: 0,
    totalNTS: 0,
    totalNTB: 0
  });
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Simulated stats based on user type
    const generateStats = () => {
      const isITUser = user?.userType === "IT";
      
      if (isITUser) {
        setStats({
          totalCompanies: Math.floor(Math.random() * (500 - 300) + 300),
          totalListings: Math.floor(Math.random() * (1000 - 800) + 800),
          totalNTS: Math.floor(Math.random() * (400 - 200) + 200),
          totalNTB: Math.floor(Math.random() * (600 - 400) + 400)
        });
      } else {
        // Solar user stats
        setStats({
          totalCompanies: Math.floor(Math.random() * (200 - 100) + 100),
          totalListings: Math.floor(Math.random() * (400 - 200) + 200),
          totalNTS: Math.floor(Math.random() * (150 - 50) + 50),
          totalNTB: Math.floor(Math.random() * (250 - 150) + 150)
        });
      }
    };

    generateStats();
  }, [user?.userType]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {/* Total Companies Card */}
        <div className="rounded-2xl bg-[#f7f7f7] p-3 shadow-sm sm:rounded-3xl sm:p-5">
          <div className="flex items-start justify-between mt-4 md:mt-0">
            <div>
              <p className="mb-0.5 text-xs text-gray-500 sm:mb-1 sm:text-sm">
                Total Companies
              </p>
              <h3 className="text-lg sm:text-2xl md:font-semibold">
                {stats.totalCompanies.toLocaleString()}
              </h3>
            </div>
            <div className="md:ml-2 -mt-4 sm:ml-3 md:mt-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 30 30"
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_76_369)">
                  <path
                    d="M9.99 5.625H20.01L22.1725 3.895C22.9088 3.3075 23.1838 2.35375 22.8725 1.46375C22.5613 0.57375 21.7525 0 20.8125 0H9.1875C8.2475 0 7.43875 0.575 7.1275 1.46375C6.81625 2.3525 7.09125 3.3075 7.82625 3.89375L9.99 5.625Z"
                    fill="#11B70E"
                  />
                  <path
                    d="M20.1813 7.5H9.81875C6.405 10.8512 3.75 16.7312 3.75 21.5625C3.75 25.7612 5.9725 30 10.9375 30H19.375C23.6162 30 26.25 26.7663 26.25 21.5625C26.25 16.7312 23.595 10.8512 20.1813 7.5ZM14.525 17.8125H15.475C16.9362 17.8125 18.125 19.0013 18.125 20.4625C18.125 21.7763 17.1775 22.8575 15.9375 23.0775V24.0613C15.9375 24.5788 15.5175 24.9988 15 24.9988C14.4825 24.9988 14.0625 24.5788 14.0625 24.0613V23.125H12.8125C12.295 23.125 11.875 22.705 11.875 22.1875C11.875 21.67 12.295 21.25 12.8125 21.25H15.475C15.9025 21.25 16.25 20.9025 16.25 20.475C16.25 20.035 15.9025 19.6875 15.475 19.6875H14.525C13.0638 19.6875 11.875 18.4987 11.875 17.0375C11.875 15.7238 12.8225 14.6425 14.0625 14.4225V13.4375C14.0625 12.92 14.4825 12.5 15 12.5C15.5175 12.5 15.9375 12.92 15.9375 13.4375V14.375H17.1875C17.705 14.375 18.125 14.795 18.125 15.3125C18.125 15.83 17.705 16.25 17.1875 16.25H14.525C14.0975 16.25 13.75 16.5975 13.75 17.025C13.75 17.465 14.0975 17.8125 14.525 17.8125Z"
                    fill="#11B70E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_76_369">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Total Listings Card */}
        <div className="rounded-2xl bg-[#f7f7f7] p-3 shadow-sm sm:rounded-3xl sm:p-5">
          <div className="flex items-start justify-between mt-4 md:mt-0">
            <div>
              <p className="mb-0.5 text-xs text-gray-500 sm:mb-1 sm:text-sm">
                Total Listings (NTS & NTB)
              </p>
              <h3 className="text-lg sm:text-2xl md:font-bold">
                {stats.totalListings.toLocaleString()}
              </h3>
            </div>
            <div className="-mt-4 md:mt-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 30 30"
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6872 14.843C21.7794 14.843 25.1081 11.5137 25.1081 7.42151C25.1081 3.32931 21.7794 0 17.6872 0C13.595 0 10.2657 3.32931 10.2657 7.42151C10.2657 11.5137 13.595 14.843 17.6872 14.843Z"
                  fill="#245AFF"
                />
                {/* Rest of the SVG paths remain the same */}
              </svg>
            </div>
          </div>
        </div>

        {/* Total NTS Card */}
        <div className="rounded-2xl bg-[#f7f7f7] p-3 shadow-sm sm:rounded-3xl sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-0.5 text-xs text-gray-500 sm:mb-1 sm:text-sm text-nowrap -ml-2 mt-8 md:mt-1">
                Total NTS
              </p>
              <h3 className="text-lg sm:text-2xl md:font-bold">
                {stats.totalNTS.toLocaleString()}
              </h3>
            </div>
            <div className="mt-1 sm:mt-2">
              <Package className="h-7 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Total NTB Card */}
        <div className="rounded-2xl bg-[#f7f7f7] p-3 shadow-sm sm:rounded-3xl sm:p-5">
          <div className="flex items-start justify-between md:mt-0">
            <div>
              <p className="mb-0.5 text-xs text-gray-500 sm:mb-1 sm:text-sm text-nowrap -ml-2 mt-8 md:mt-1">
                Total NTB
              </p>
              <h3 className="text-lg sm:text-2xl md:font-semibold">
                {stats.totalNTB.toLocaleString()}
              </h3>
            </div>
            <div className="mt-1 sm:mt-2">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 2.5C7.975 2.5 5.3125 5.1625 5.3125 8.4375C5.3125 11.65 7.825 14.25 11.1 14.3625C11.2 14.35 11.3 14.35 11.375 14.3625C11.4 14.3625 11.4125 14.3625 11.4375 14.3625C11.45 14.3625 11.45 14.3625 11.4625 14.3625C14.6625 14.25 17.175 11.65 17.1875 8.4375C17.1875 5.1625 14.525 2.5 11.25 2.5Z"
                  fill="#F6660D"
                />
                {/* Rest of the SVG paths remain the same */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;