// @ts-nocheck


import React, { useState, useRef } from "react";
import { Plus, FileType, X, Download } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { importItem } from "@/lib/feature/item/itemSlice";

interface FileUploadProps {
  listingType: "Buy" | "Sell";
}

const FileUpload: React.FC<FileUploadProps> = ({ listingType }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.auth);

  const showImportResults = (result: any) => {
    const { summary, results } = result;
    
    if (summary.successful > 0) {
      toast.custom(
        (t) => (
          <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 max-w-2xl">
            <div className="space-y-4">
              <p className="font-semibold text-green-600">Import Successful!</p>
              <ul className="text-2xl">
                <li>Total Items: {summary.total}</li>
                <li>Successfully Imported: {summary.successful}</li>
                <li>Failed: {summary.failed}</li>
              </ul>
            </div>
          </div>
        ),
        { duration: 8000 }
      );
    }

    if (results.failed.length > 0) {
      const failedItems = results.failed.map((item: any) => ({
        sku: item.sku,
        error: item.error.includes("E11000 duplicate key error") 
          ? `SKU ${item.sku} already exists in the database`
          : item.error
      }));

      toast.custom(
        (t) => (
          <div className="bg-white border border-red-200 shadow-lg rounded-lg p-4 max-w-2xl">
            <div className="space-y-2">
              <p className="font-semibold text-red-600">Some items failed to import:</p>
              <div className="max-h-40 overflow-y-auto">
                {failedItems.map((item: any, index: number) => (
                  <div key={index} className="text-2xl mt-1">
                    <span className="font-medium">{item.sku}: </span>
                    {item.error}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
        { duration: 8000 }
      );
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Rest of the component remains the same...
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const maxFiles = 5;

    setError("");

    if (selectedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = selectedFiles.filter(file => {
      const allowedTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}. Only CSV and Excel files allowed.`);
        return false;
      }

      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      setFiles(validFiles);
      toast.success(`${validFiles.length} file(s) ready for upload`);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setError("");
    setLoading(true);

    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("listingType", listingType);
        files.forEach(file => formData.append("file", file));

        const resultAction = await dispatch(
          importItem({
            formData,
            token,
            listingType,
          })
        ).unwrap();

        if (resultAction) {
          showImportResults(resultAction);
          setFiles([]);
          resolve(resultAction);
        } else {
          reject(new Error("Import failed"));
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Import failed";
        setError(errorMessage);
        reject(errorMessage);
      } finally {
        setLoading(false);
      }
    });

    toast.promise(uploadPromise, {
      loading: 'Importing items...',
      success: 'Import process completed',
      error: (err) => `Import failed: ${err.toString()}`
    });
  };
  const handleExampleDownload = (fileType: 'csv' | 'xls') => {
    // These URLs should point to your actual example files
    const fileUrls = {
      csv: '/examples/inventory-template.csv',
      xls: '/examples/inventory-template.xls'
    };

    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = fileUrls[fileType];
    link.download = `inventory-template.${fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="mb-8 rounded-3xl bg-[#f7f7f7] px-5 py-9">
      <Toaster position="top-right" />
      
      <h2 className="mb-6 text-center text-xl font-semibold">
        {listingType} Inventory Import
      </h2>

      <div className="flex flex-col items-start justify-between md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {/* File Attachment Box */}
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-gray-300 bg-white p-10 md:p-14">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.xls,.xlsx"
              multiple
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center"
            >
              <FileType className="mb-4 h-12 w-12 text-orange-500" />
              <p className="text-center text-gray-400">
                {files.length > 0
                  ? `${files.length} file(s) selected`
                  : `Attach your ${listingType.toLowerCase()} inventory files
                  `}
              </p>
            </label>
          </div>
          <div className="mt-10 text-center">
              <p className="text text-black font-bold mb-2">Example files:</p>
              <div className="space-y-2 gap-3 justify-center ">
                <button
                  onClick={() => handleExampleDownload('csv')}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Download className="h-4 w-4" />
                  example.csv
                </button>
                <button
                  onClick={() => handleExampleDownload('xls')}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Download className="h-4 w-4" />
                  example.xls
                </button>
              </div>
            </div>
          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-2 font-medium">Selected Files:</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded bg-gray-100 p-2"
                  >
                    <span>{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
        </div>

        {/* Right Section */}
        <div className="mt-6 flex flex-col items-start md:ml-4 md:mt-0 md:items-end">
      
          <div className="mt-8 md:mt-20">
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || loading}
              className={`
                flex items-center gap-2 rounded-xl px-6 py-2 text-white
                ${
                  files.length > 0 && !loading
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-gray-400"
                }
              `}
            >
              {loading ? "Uploading..." : `Upload ${listingType} Items`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;