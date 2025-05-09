import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleFileChange = (e: { target: { files: { name: React.SetStateAction<null>; }[]; }; }) => {
    setSelectedFile(e.target.files[0].name);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle file submission logic here
  };

  return (
    <div id="dashboard">
      <div className="container mx-auto p-2">
        {/* Tab Header */}
        <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <button
              onClick={() => handleTabChange("upload")}
              className={`rounded-t-lg px-4 py-2 font-bold transition-all duration-300 ease-in-out ${
                activeTab === "upload"
                  ? "border  bg-[#161e3c] text-white shadow-lg "
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
              }`}
            >
              Upload
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => handleTabChange("edit")}
              className={`rounded-t-lg px-4 py-2 font-bold transition-all duration-300 ease-in-out ${
                activeTab === "edit"
                  ? "border  bg-[#161e3c] text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
              }`}
            >
              Edit/Delete
            </button>
          </li>
        </ul>

        {/* Upload Form */}
        {activeTab === "upload" && (
          <div className="rounded-lg bg-white p-8 shadow-lg shadow-gray-500">
            <h2 className="mb-6 text-3xl font-bold text-gray-700">
              Upload Inventory
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex w-full items-center justify-center">
                  <div className="mx-auto max-w-lg overflow-hidden rounded-lg">
                    <div className="p-4">
                      <div className="relative flex h-48 items-center justify-center rounded-lg border-2 border-dotted border-[#161e3c] bg-gray-50 shadow-sm">
                        <div className="absolute flex flex-col items-center">
                          <svg
                            className="h-16 w-16 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16V8a2 2 0 012-2h6a2 2 0 012 2v8M5 12h14m-7-7l3 3m0 0l-3 3m3-3H7"
                            ></path>
                          </svg>
                          <span className="mt-3 block font-medium text-gray-500">
                            Attach your files here
                          </span>
                          <span className="text-sm font-normal text-gray-400">
                            Excel or CSV*
                          </span>
                        </div>
                        <input
                          type="file"
                          className="h-full w-full cursor-pointer opacity-0"
                          name="file"
                          accept=".xls,.xlsx,.csv"
                        />
                      </div>
                      {selectedFile && (
                        <p className="mt-3 text-center text-black">
                          Selected file:{" "}
                          <strong className="font-bold text-orange-500">
                            {selectedFile}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-center text-gray-600">or</p>

              <div className="mb-6">
                <p className="font-bold text-gray-700">Example Files</p>
                <div className="flex gap-4">
                  <a
                    href="/example.xls"
                    className="text-[#161e3c] text-xl underline hover:text-indigo-600"
                  >
                    example.xls
                  </a>
                  <a
                    href="/example.csv"
                    className="text-[#161e3c] text-xl underline hover:text-indigo-600"
                  >
                    example.csv
                  </a>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className=" border bg-[#161e3c] rounded-2xl  px-6 py-3 font-bold text-white  shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Form */}
        {activeTab === "edit" && (
          <div className="container mx-auto md:p-2">
            <div className="rounded-lg bg-white p-8 shadow-lg shadow-gray-500 ">
              <h2 className="mb-6 text-3xl font-bold text-gray-700">
                Edit Inventory
              </h2>
              <form className="w-full max-w-full">
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Part #
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-part-number"
                      type="text"
                      placeholder="Part Number"
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Location *
                    </label>
                    <select
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-location"
                    >
                      <option>Please Select A Location</option>
                      <option>Warehouse A</option>
                      <option>Warehouse B</option>
                    </select>
                  </div>
                </div>
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Mfg *
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-part-number"
                      type="text"
                      placeholder="Part Number"
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Warranty
                    </label>
                    <select
                      className="bg- block w-full appearance-none rounded border border-gray-900 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-warranty"
                    >
                      <option className="text-black">Yes</option>
                      <option className="text-black">No</option>
                    </select>
                  </div>
                </div>

                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Price
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-price"
                      type="number"
                      placeholder="$1000.00"
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Price Per Watt
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-price-per-watt"
                      type="number"
                      placeholder="0.050"
                    />
                  </div>
                </div>
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Watt
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-watt"
                      type="number"
                      placeholder="20000"
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Quantity *
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-quantity"
                      type="number"
                      placeholder="2"
                    />
                  </div>
                </div>
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="w-full px-3">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Description *
                    </label>
                    <textarea
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-description"
                      placeholder="This is an example part"
                    />
                  </div>
                </div>
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Condition
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-condition"
                      type="text"
                      placeholder="NEW"
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Stats
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-300  px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-stats"
                      type="text"
                      placeholder="Additional stats"
                    />
                  </div>
                </div>

                {/* Submit Button */}


                <div className="mt-6 flex justify-end p-3">
                  <button
                    type="submit"
                    className=" text-white  p-4  border rounded-2xl px-7 bg-[#161e3c] font-bold shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
