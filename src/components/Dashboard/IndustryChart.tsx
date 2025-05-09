"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  month: string;
  solarIndustries: number;
  itIndustries: number;
}

interface LegendPayload {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayload[];
}

const data: DataPoint[] = [

  { month: 'Jun', solarIndustries: 25, itIndustries: 38 },
  { month: 'Jul', solarIndustries: 45, itIndustries: 52 },
  { month: 'Aug', solarIndustries: 32, itIndustries: 22 },
  { month: 'Sep', solarIndustries: 40, itIndustries: 45 },
  { month: 'Oct', solarIndustries: 25, itIndustries: 35 },
  { month: 'Nov', solarIndustries: 45, itIndustries: 52 },
  { month: 'Dec', solarIndustries: 48, itIndustries: 58 }
];

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  if (!payload) return null;
  
  return (
    <div className="flex justify-between items-center w-full pb-4">
      <div className="flex items-center gap-8">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 ">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-1 text-sm text-gray-500">Day</button>
        <button className="px-4 py-1 text-sm text-gray-500">Week</button>
        <button className="px-4 py-1 text-sm text-gray-500">Month</button>
      </div>
    </div>
  );
};

const IndustryChart: React.FC = () => {
  return (
    <div className="w-full p-3 rounded-xl mt-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Industries</h2>
      
      <div className=" w-full bg-[#f7f7f7] rounded-3xl">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              ticks={[0, 10,20, 30,40, 50, 60]}
              dx={-10}
            />
            <Legend
              verticalAlign="top"
              align="left"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px' }}
            />
            <Line
              type="linear"
              dataKey="solarIndustries"
              stroke="#4F46E5"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6, fill: "#4F46E5" }}
              name="Solar Industries"
            />
            <Line
              type="linear"
              dataKey="itIndustries"
              stroke="#F97316"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6, fill: "#F97316" }}
              name="IT Industries"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IndustryChart;