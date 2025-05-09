/* eslint-disable react/display-name */
// @ts-nocheck

"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchItems, deleteItem } from "@/lib/feature/item/itemSlice";
import { Pencil, Trash2, FileText, Image, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableEmpty, TableError, TableLoader } from "../TableMang";

// Separate component for better performance
// eslint-disable-next-line react/display-name
const ListingTypeBadge = React.memo(({ type }) => (
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
));

// Separate pagination component
const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`mx-1 rounded-md px-3 py-1 
          ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
      >
        First
      </Button>
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
      >
        Previous
      </Button>
      {pages}
      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
      >
        Next
      </Button>
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
      >
        Last
      </Button>
    </div>
  );
});

// Table header component
const TableHeader = React.memo(() => (
  <thead className="sticky top-0 z-10 bg-gray-100 text-xs uppercase text-gray-700">
    <tr>
      <th scope="col" className="p-4">
        <input type="checkbox" className="h-4 w-4 rounded" />
      </th>
      <th scope="col" className="px-6 py-3">
        Type
      </th>
      <th scope="col" className="px-6 py-3">
        Posted
      </th>
      <th scope="col" className="px-6 py-3">
        Location
      </th>
      <th scope="col" className="px-6 py-3">
        SKU
      </th>
      <th scope="col" className="px-6 py-3">
        Part Number
      </th>
      <th scope="col" className="px-6 py-3">
        Manufacturer
      </th>
      <th scope="col" className="px-6 py-3">
        Condition
      </th>
      <th scope="col" className="px-6 py-3">
        Warranty
      </th>
      <th scope="col" className="px-6 py-3">
        Price
      </th>
      <th scope="col" className="px-6 py-3">
        Actions
      </th>
    </tr>
  </thead>
));

const UserProductsTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, totalItems, totalPages, loading, error } = useSelector(
    (state) => ({
      items: state.items.items,
      totalItems: state.items.totalItems,
      totalPages: state.items.totalPages,
      loading: state.items.loading,
      error: state.items.error,
    }),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [filters, setFilters] = useState({
    manufacturer: "",
    category: "",
    itemType: "",
    location: "",
    listingType: "",
  });

  const token = useSelector((state) => state.auth.token);

  // Memoized fetch function
  const fetchData = useCallback(() => {
    dispatch(
      fetchItems({
        params: {
          page: currentPage,
          limit: 10,
          ...filters,
        },
        token,
      }),
    );
  }, [dispatch, currentPage, filters, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized delete handler
  const handleDelete = useCallback(
    async (id, itemType) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        await dispatch(deleteItem({ id, itemType, token }));
        fetchData();
      }
    },
    [dispatch, token, fetchData],
  );

  // Memoized filter handler
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  // Table body content
  const renderTableContent = useMemo(() => {
    if (loading) return <TableLoader />;
    if (error) return <TableError onRetry={fetchData} />;
    if (!items?.length) {
      return (
        <>
          <TableHeader />
          <tbody>
            <tr>
              <td colSpan="11" className="p-4">
                <TableEmpty message="No items found in your inventory" />
              </td>
            </tr>
          </tbody>
        </>
      );
    }

    return (
      <>
        <TableHeader />
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b transition-colors hover:bg-gray-50 
              ${index % 2 === 0 ? "bg-white" : "bg-[#fef7f3]"}`}
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  checked={selectedItems.has(item._id)}
                  onChange={(e) => {
                    const newSelected = new Set(selectedItems);
                    if (e.target.checked) {
                      newSelected.add(item._id);
                    } else {
                      newSelected.delete(item._id);
                    }
                    setSelectedItems(newSelected);
                  }}
                />
              </td>
              <td className="px-6 py-4">
                <ListingTypeBadge type={item.listingType} />
              </td>
              <td className="px-6 py-4">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{item.location}</td>
              <td className="px-6 py-4">{item.sku}</td>
              <td className="px-6 py-4">{item.partNumber}</td>
              <td className="px-6 py-4">{item.manufacturer}</td>
              <td className="px-6 py-4">{item.condition}</td>
              <td className="px-6 py-4">{item.warranty}</td>
              <td className="px-6 py-4">${item.price.toFixed(2)}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item._id, item.itemType)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }, [items, loading, error, selectedItems, handleDelete]);

  return (
    <div className="relative mt-3 overflow-x-auto rounded-lg bg-gray-50 md:mx-4 md:mt-7">
      <div className="w-full p-2 md:p-4">
        {/* Filters */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-5">
          <select
            className="rounded border p-2"
            value={filters.listingType}
            onChange={(e) => handleFilterChange("listingType", e.target.value)}
          >
            <option value="">All Listings</option>
            <option value="Sell">WTS</option>
            <option value="Buy">WTB</option>
          </select>
          {/* Additional filter inputs can be added here */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            {renderTableContent}
          </table>

          {/* Pagination */}
          {!loading && !error && items?.length > 0 && (
            <div className="mb-4 mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <div className="mt-2 text-center text-sm text-gray-600">
                Showing {items.length} of {totalItems} items
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserProductsTable);
