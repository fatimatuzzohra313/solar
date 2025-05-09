// AccountDetails.tsx
// @ts-nocheck

"use client"
import React, { useState } from "react";
import { Plus, Upload, FileType } from "lucide-react";
import TableView from "./TableUpload";
import SolarEquipmentForm from "./TableUpload";
import FileUpload from "./FileUpload";

const AccountDetails = () => {
  const [activeComponent, setActiveComponent] = useState("upload");
  const [listingType, setListingType] = useState("Sell"); // Changed to "Sell" as default

  return (
    <div className="mx-4 max-w-4xl py-8 md:mx-auto">
      {/* Mode Selection Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          className={`rounded-2xl px-6 py-2 font-medium ${
            listingType === "Sell" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setListingType("Sell")}
        >
          Need to Sell
        </button>
        <button
          className={`rounded-2xl px-6 py-2 font-medium ${
            listingType === "Buy" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setListingType("Buy")}
        >
          Need to Buy
        </button>
      </div>

      {/* Header with action buttons */}
      <div className="mx-2 mb-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        {/* Header Section */}
        <h1 className="text-lg font-semibold md:text-xl">
        </h1>

        {/* Buttons Section */}
        <div className="mt-3 flex flex-wrap gap-2 md:ml-24 md:mt-0 md:gap-2">
          <button
            className={`rounded-md px-4 py-1.5 ${
              activeComponent === "upload" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveComponent("upload")}
          >
            Table
          </button>

          <button
            className={`rounded-md px-4 py-1.5 ${
              activeComponent === "table" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveComponent("table")}
          >
            File Upload
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {activeComponent === "upload" && <SolarEquipmentForm listingType={listingType} />}
      {activeComponent === "table" && <FileUpload listingType={listingType} />}
    </div>
  );
};

export default AccountDetails;