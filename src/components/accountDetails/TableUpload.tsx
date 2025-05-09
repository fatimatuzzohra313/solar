// @ts-nocheck

"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "@/lib/feature/item/itemSlice";
import { X, Upload } from "lucide-react";
import { RootState } from "@/lib/store/store";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface SolarEquipmentFormProps {
  listingType: string;
}

const SolarEquipmentForm = ({ listingType }: SolarEquipmentFormProps) => {
  const initialFormData = {
    category: "",
    partNumber: "",
    wattage: "",
    manufacturer: "",
    price: "",
    quantity: "",
    condition: "",
    warranty: "",
    location: "",
    additionalComments: "",
    listingType: listingType,
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [priceFormat, setPriceFormat] = useState("PPW"); // Just for UI control

  const [files, setFiles] = useState<File[]>([]);
  const [pictures, setPictures] = useState<File[]>([]);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const isITUser = user?.userType === "IT";
  const solarCategories = [
    "Inverters",
    "Storage, Batteries",
    "Racking and Mount",
    "Full PV System",
    "Charge Controllers",
    "PV Connectors",
    "Other",
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

  const validateForm = () => {
    const requiredFields = [
      "category",
      "partNumber",
      "manufacturer",
      "price",
      "quantity",
      "condition",
      "location",
      "message",
      "additionalComments",
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields
        .map((field) => field.charAt(0).toUpperCase() + field.slice(1))
        .join(", ");
      toast.error(`Please fill in all required fields: ${fieldNames}`);
      return false;
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    if (parseInt(formData.quantity) <= 0) {
      toast.error("Quantity must be greater than 0");
      return false;
    }

    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    setError("");
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPictures = e.target.files ? Array.from(e.target.files) : [];
    const maxSize = 5 * 1024 * 1024;
    const maxFiles = 5;

    if (selectedPictures.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} pictures allowed`);
      return;
    }

    const validPictures = selectedPictures.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`Picture ${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      return true;
    });

    setPictures(validPictures);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const maxSize = 5 * 1024 * 1024;
    const maxFiles = 5;

    if (selectedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Maximum size is 5MB`);
        return false;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/csv",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} has an unsupported file type`);
        return false;
      }

      return true;
    });

    setFiles(validFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Submitting listing...");

    try {
      const submitFormData = new FormData();
      submitFormData.append("itemType", isITUser ? "IT" : "Solar");

      // Process form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          submitFormData.append(key, String(value));
        }
      });

      // Add files
      files.forEach((file) => {
        submitFormData.append("attachments", file);
      });

      // Add pictures for IT items
      if (isITUser && pictures.length > 0) {
        pictures.forEach((picture) => {
          submitFormData.append("pictures", picture);
        });
      }

      const resultAction = await dispatch(
        createItem({
          formData: submitFormData,
          token,
        }),
      ).unwrap();

      if (resultAction.success) {
        // Clear form
        setFormData(initialFormData);
        setFiles([]);
        setPictures([]);
        setError("");

        // Show success message
        toast.success("Listing submitted successfully!", {
          duration: 5000,
        });
      } else {
        throw new Error(resultAction.message || "Failed to submit form");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to submit form";
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
      console.error("Error:", err);
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    toast.success("File removed");
  };

  const removePicture = (index: number) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
    toast.success("Picture removed");
  };
  const handlePriceFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceFormat(e.target.value);
    // Clear price when format changes to avoid confusion
    setFormData((prev) => ({ ...prev, price: "" }));
  };
  const getLocationLabel = () => {
    return listingType === "Buy" 
      ? "Location (Delivery Zip Code)" 
      : "Location (Shipping Zip Code)";
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {listingType} Equipment Listing
          </h1>
          <p className="mt-2 text-gray-600">
            Fill in the details below to create your listing
          </p>
        </div>

        {/* Main Form Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Category Section */}
            <div className="mb-3">
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select a category</option>
                {(isITUser ? itCategories : solarCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Price {!isITUser && "(Select format)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                {!isITUser ? (
                  <>
                    <select
                      value={priceFormat}
                      onChange={handlePriceFormatChange}
                      className="w-1/4 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="PPW">PPW</option>
                      <option value="Per Unit">Per Unit</option>
                    </select>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min={0}
                        step={priceFormat === "PPW" ? "0.001" : "0.01"}
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder={
                          priceFormat === "PPW"
                            ? " e.g., $ 0.002/w"
                            : "e.g $120/unit"
                        }
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500"></span>
                      </div>
                    </div>
                  </>
                ) : (
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min={0}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter price per unit"
                  />
                )}
              </div>
            </div>
            {/* Equipment Details Grid */}
            <div className="mb-8 mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  id: "partNumber",
                  label: "Part Number",
                  type: "text",
                  required: true,
                  show: true,

                },
                { id: "wattage", label: "Wattage ", type: "text"  ,show: !isITUser, 
                },
                {
                  id: "manufacturer",
                  label: "Manufacturer",
                  type: "text",
                  required: true,
                  show: true,

                },

                {
                  id: "quantity",
                  label: "Quantity",
                  type: "number",
                  required: true,
                  show: true,

                },
                {
                  id: "condition",
                  label: "Condition",
                  type: "text",
                  required: true,
                  show: true,

                },
                {
                  id: "warranty",
                  label: "Warranty",
                  type: "text",
                  required: false,
                  show: true,

                },
                {
                  id: "location",
                  label: getLocationLabel(),
                  type: "text",
                  required: true,
                  show: true,

                },
              ]
              .filter(field => field.show) 
              .map(({ id, label, type, required }) => (
                <div key={id} className="relative">
                  <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={type}
                    id={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleInputChange}
                    required={required}
                    min={type === "number" ? 0 : undefined}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            {/* Message and Comments Section */}
            <div className="mb-8 space-y-6">
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Message Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter message subject"
                />
              </div>

              <div>
                <label
                  htmlFor="additionalComments"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Additional Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="additionalComments"
                  rows={4}
                  value={formData.additionalComments}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter any additional details"
                />
              </div>
            </div>

            {/* File Upload Sections */}
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Attachments Upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Attachments
                </label>
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-all hover:border-blue-500 hover:bg-blue-50">
                  <label className="flex cursor-pointer flex-col items-center">
                    <Upload className="h-12 w-12 text-blue-500" />
                    <p className="mt-2 text-sm text-gray-600">
                      Select files (max 5, 5MB each)
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.csv"
                    />
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                      >
                        <span className="text-sm text-gray-700">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="hover:text-red-500 text-gray-400"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pictures Upload */}
              {isITUser && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Pictures
                  </label>
                  <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-all hover:border-blue-500 hover:bg-blue-50">
                    <label className="flex cursor-pointer flex-col items-center">
                      <span className="text-3xl">📷</span>
                      <p className="mt-2 text-sm text-gray-600">
                        Select images (max 5, 5MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handlePictureChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                  {pictures.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {pictures.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                        >
                          <span className="text-sm text-gray-700">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removePicture(index)}
                            className="hover:text-red-500 text-gray-400"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 text-red-600 mb-6 rounded-lg p-4 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl px-6 py-3 text-white transition-all ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#161e3c] hover:bg-primary focus:ring-4 focus:ring-blue-200"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                `Submit ${listingType} Listing`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolarEquipmentForm;
