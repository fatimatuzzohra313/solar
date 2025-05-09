"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import PastelPieChart from "./ContactCard";

const profitData = [
  { name: "Sat", deposit: 450, withdraw: 200 },
  { name: "Sun", deposit: 300, withdraw: 100 },
  { name: "Mon", deposit: 300, withdraw: 250 },
  { name: "Tue", deposit: 450, withdraw: 350 },
  { name: "Wed", deposit: 150, withdraw: 200 },
  { name: "Thu", deposit: 380, withdraw: 220 },
  { name: "Fri", deposit: 350, withdraw: 300 },
];

const AnalyticsDashboard = () => {
  return (
    <div className="md:flex-row flex w-full  flex-col">
      <div className="md:w-[60%] rounded-3xl bg-white p-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
User Profile          </h2>
        </div>
        <div className="w-full rounded-3xl">
          <PastelPieChart />
        </div>
      </div>

    
    </div>
  );
};

export default AnalyticsDashboard;