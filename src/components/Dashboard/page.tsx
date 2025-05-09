import React from "react";
import Image from "next/image";
import DashboardStats from "./DashboardStats";
import IndustryChart from "./IndustryChart";
import AnalyticsDashboard from "./Analytics";
const Dashboard = () => {
  return (
    <>
      <div className="flex w-full gap-2 p-4 overflow-hidden">
        {/* First box - approximately 15% width */}
        <div className="w-1/6  rounded-lg  ">
          <Image src="/dashbordHome1.png" height={150} width={550} alt="jj" />
        </div>

        {/* Middle box - approximately 70% width */}
        <div className="w-2/3 ">
          <DashboardStats />
          <div className="hidden md:block">
            <IndustryChart />

            <AnalyticsDashboard />
          </div>
        </div>

        {/* Last box - approximately 15% width */}
        <div className="w-1/6  rounded-lg ">
          <Image src="/homedash2.png" height={100} width={550} alt="jj" />
        </div>
      </div>
      <div className="block md:hidden px-3">
        <IndustryChart />

        <AnalyticsDashboard />
      </div>
    </>
  );
};

export default Dashboard;
