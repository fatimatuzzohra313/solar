// @ts-nocheck

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicItems } from "@/lib/feature/item/itemSlice";
import { RootState } from "@/lib/store/store";
import Link from "next/link";
import { Eye, X, ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ItemDetailsView from "./ItemDetailsView";
import { TableEmpty, TableError, TableLoader } from "../TableMang";

const MarketTable = () => {
  const dispatch = useDispatch();
  const { publicItems, loading, error } = useSelector((state) => ({
    publicItems: state.items.publicItems,
    loading: state.items.loading,
    error: state.items.error,
  }));
  const { user } = useSelector((state: RootState) => state.auth);

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState(null);


  // Enhanced filters with user type
  const [filters, setFilters] = useState({
    listingType: "all",
    dateRange: "all",
    userType: user?.userType || "",
    manufacturer: "",
    searchQuery: "",
    category: "all"
  });

  // Validate user access rights
  const canViewData = (itemUserType: any) => {
    if (!user?.userType) return false;

    // Define access hierarchy
    const accessLevels = {
      admin: ["admin", "supplier", "distributor", "manufacturer"],
      supplier: ["supplier", "distributor"],
      distributor: ["distributor"],
      manufacturer: ["manufacturer"],
    };

    return accessLevels[user.userType]?.includes(itemUserType) || false;
  };

  const solarCategories = [
    "Inverters",
    "Storage, Batteries",
    "Racking and Mount",
    "Full PV System",
    "Charge Controllers",
    "PV Connectors",
    "other",
  ];
  
  const itCategories = [
    "Computers",
    "Laptops",
    "Servers/Routers",
    "ERP Solutions",
    "Website Development ",
    "Marketing Offerings",
    "other"
  ];
  

  

  // Filter data based on user type
  const filterDataByUserType = (items) => {
    if (!items?.data) return { data: [], pagination: items?.pagination };

    const filteredData = items.data.filter((item) =>
      canViewData(item.userType),
    );
    return {
      data: filteredData,
      pagination: {
        ...items.pagination,
        total: Math.ceil(filteredData.length / 10),
      },
    };
  };

 useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: currentPage,
          limit: 10,
          ...(filters.listingType !== "all" && {
            listingType: filters.listingType,
          }),
          ...(filters.category !== "all" && {
            category: filters.category,
          }),
          ...(filters.searchQuery && {
            manufacturer: filters.searchQuery,
          }),
          ...(filters.startDate && { startDate: filters.startDate }),
          ...(filters.endDate && { endDate: filters.endDate }),
          userType: user?.userType || "",
        };
        await dispatch(fetchPublicItems(params));
        setIsInitialLoad(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsInitialLoad(false);
      }
    };
  
    if (user?.userType) {
      fetchData();
    }
  }, [dispatch, currentPage, filters, user?.userType]);

  const handleFilterChange = (name, value) => {
    if (name === "searchQuery") {
      // Clear existing timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      
      // Set new timeout for search
      const newTimeout = setTimeout(() => {
        setFilters(prev => ({ ...prev, [name]: value }));
      }, 500); // 500ms debounce
      
      setSearchTimeout(newTimeout);
    } else if (name === "listingType") {
      const dbValue = value === "WTS" ? "Sell" : value === "WTB" ? "Buy" : "all";
      setFilters(prev => ({ ...prev, [name]: dbValue }));
    } else if (name === "dateRange") {
      const dateRange = getDateRange(value);
      setFilters(prev => ({
        ...prev,
        [name]: value,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
    setCurrentPage(1);
  };

  const getCategories = () => {
    if (user?.userType === "Solar") return solarCategories;
    if (user?.userType === "IT") return itCategories;
    return [...solarCategories, ...itCategories]; // For admin or other types
  };
  // Modify getDateRange function:
  const getDateRange = (dateRange) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate, endDate;

    switch (dateRange) {
      case "today":
        startDate = today;
        endDate = new Date(today);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "7days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = new Date(today);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "30days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        endDate = new Date(today);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        return { startDate: null, endDate: null };
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  };

  // Memoized table data
  const filteredTableData = React.useMemo(() => {
    return filterDataByUserType(publicItems);
  }, [publicItems, user?.userType]);

  const ListingTypeBadge = ({ type }) => (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
      ${
        type === "Sell"
          ? "border-gray-700 bg-[#161e3c] text-white"
          : "border border-amber-200 bg-[#f97316] text-black"
      }`}
    >
      {type === "Sell" ? "NTS" : "NTB"}
    </div>
  );





  return (
    <div className="space-y-6 p-4">
      {/* Header Section */}
      <div className="flex flex-col gap-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Market Items</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="bg-[#f97316] text-white">
              <Link href="/market">View All</Link>
            </Button>
            <Button variant="outline">
              <Link href="/accountDeatils/UserTable">My Items</Link>
            </Button>
          </div>
        </div>

     
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            value={filters.listingType}
            onValueChange={(value) => handleFilterChange("listingType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Listing Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="WTS">Want to Sell (WTS)</SelectItem>
              <SelectItem value="WTB">Want to Buy (WTB)</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.dateRange}
            onValueChange={(value) => handleFilterChange("dateRange", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {getCategories().map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search manufacturer..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-8 py-2 text-sm ring-offset-background"
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleFilterChange("searchQuery", "")}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Manufacturer filter moved to its own row */}
      
      </div>
      {/* Table Section */}
      <div className="rounded-lg bg-white shadow">
        {isInitialLoad ? (
          <TableLoader />
        ) : error ? (
          <TableError />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              {/* Table headers remain the same */}
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Posted
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mfg
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Part/Model
                  </th>
                  {user?.userType === "Solar" && (
                    <th scope="col" className="px-6 py-3">Wattage</th>
                  )}
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Warranty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Condition
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Detail
                  </th>
                </tr>{" "}
              </thead>
              <tbody>
                {!publicItems?.data?.length ? (
                  <tr>
                    <td colSpan={14}>
                      <TableEmpty />
                    </td>
                  </tr>
                ) : (
                  publicItems.data.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-b transition-colors hover:bg-gray-50 
                        ${index % 2 === 0 ? "bg-white" : "bg-[#fdf0e8]"}`}
                    >
                      <td className="px-6 py-4">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <ListingTypeBadge type={item.listingType} />
                      </td>
                      <td className="px-6 py-4">{item.category || "N/A"}</td>
                      <td className="px-6 py-4">{item.manufacturer}</td>
                      <td className="px-6 py-4">{item.partNumber}</td>
                      {user?.userType === "Solar" && (
                        <td className="px-6 py-4">{item.sku}</td>
                      )}
                      <td className="px-6 py-4">{item.location}</td>
                      <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4">{item.warranty}</td>
                      <td className="px-6 py-4">{item.condition}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        <ItemDetailsView item={item} />
                      </td>
                    </tr>
                  ))
                )}{" "}
              </tbody>
            </table>
          </div>
        )}

       
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < (publicItems?.pagination?.total || 1)
                    ? prev + 1
                    : prev,
                )
              }
              disabled={currentPage === (publicItems?.pagination?.total || 1)}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span>{" "}
                of{" "}
                <span className="font-medium">
                  {publicItems?.pagination?.total || 1}
                </span>
              </p>
            </div>
            <div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <Button
                variant="outline"
                className="rounded-l-md"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-r-md"
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < (publicItems?.pagination?.total || 1)
                      ? prev + 1
                      : prev,
                  )
                }
                disabled={currentPage === (publicItems?.pagination?.total || 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTable;
