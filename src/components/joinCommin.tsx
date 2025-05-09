// @ts-nocheck

"use client";
import { useCreateJoinRequestMutation } from "@/lib/feature/auth/auththunk";
import { useState } from "react";

export default function JoinCommunity() {
  const [createJoinRequest, { isLoading }] = useCreateJoinRequestMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
    country: "",
    companyName: "",
    companyRole: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.companyRole.trim()) newErrors.companyRole = "Company role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createJoinRequest(formData).unwrap();
      // Clear form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        state: "",
        country: "",
        companyName: "",
        companyRole: ""
      });
      alert("Join request submitted successfully!");
    } catch (error) {
      alert(error.data?.message || "Failed to submit join request");
    }
  };

  const inputClasses = "text-gray-700 border-gray-300 block w-full appearance-none rounded-lg border bg-white px-4 py-3 leading-tight hover:border-[#17afc3] focus:border-[#17afc3] focus:bg-white focus:outline-none";
  const labelClasses = "mb-2 block text-xs font-bold uppercase tracking-wide text-black";
  const errorClasses = "text-red-500 text-xs italic mt-1";

  return (
    <div className="flex flex-col items-center justify-between bg-white p-8 text-black md:flex-row mt-1">
      {/* Left Section: Text Content */}
      <div className="mb-8 w-full text-black md:mb-0 md:mr-8 md:w-2/6 ml-10">
        <h2 className="mb-4 text-4xl font-medium text-[#161e3c]">
          Join Our Community
        </h2>
        <h3 className="mb-4 text-2xl">
          Repair. Resale. Recycling.
        </h3>
        <hr className="mb-4 border-t-4 border-orange-300" />
        <p>
          <span className="font-bold">Solar Companies,</span> learn more about
          Tradifier by filling out the contact form here. Well be in touch to
          give you a live demo of our trading platform.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg rounded-3xl p-6 shadow-lg border-2">
        <div className="-mx-3 mb-6 flex flex-wrap py-8">
          {/* First Name */}
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <label className={labelClasses} htmlFor="firstName">
              First Name
            </label>
            <input
              className={`${inputClasses} ${errors.firstName ? "border-red-500" : ""}`}
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
          </div>
          {/* Last Name */}
          <div className="w-full px-3 md:w-1/2">
            <label className={labelClasses} htmlFor="lastName">
              Last Name
            </label>
            <input
              className={`${inputClasses} ${errors.lastName ? "border-red-500" : ""}`}
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label className={labelClasses} htmlFor="email">
              Email
            </label>
            <input
              className={`${inputClasses} ${errors.email ? "border-red-500" : ""}`}
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label className={labelClasses} htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className={`${inputClasses} ${errors.phoneNumber ? "border-red-500" : ""}`}
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {errors.phoneNumber && <p className={errorClasses}>{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* State/Region & Country */}
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <label className={labelClasses} htmlFor="state">
              State/Region
            </label>
            <input
              className={`${inputClasses} ${errors.state ? "border-red-500" : ""}`}
              id="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              placeholder="State/Region"
            />
            {errors.state && <p className={errorClasses}>{errors.state}</p>}
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label className={labelClasses} htmlFor="country">
              Country
            </label>
            <input
              className={`${inputClasses} ${errors.country ? "border-red-500" : ""}`}
              id="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            {errors.country && <p className={errorClasses}>{errors.country}</p>}
          </div>
        </div>

        {/* Company Name */}
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label className={labelClasses} htmlFor="companyName">
              Company Name
            </label>
            <input
              className={`${inputClasses} ${errors.companyName ? "border-red-500" : ""}`}
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
            {errors.companyName && <p className={errorClasses}>{errors.companyName}</p>}
          </div>
        </div>

        {/* Company Role */}
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label className={labelClasses} htmlFor="companyRole">
              Company Role
            </label>
            <input
              className={`${inputClasses} ${errors.companyRole ? "border-red-500" : ""}`}
              id="companyRole"
              type="text"
              value={formData.companyRole}
              onChange={handleChange}
              placeholder="Company Role"
            />
            {errors.companyRole && <p className={errorClasses}>{errors.companyRole}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="rounded-full bg-[#161e3c] text-white px-6 py-3.5 text-lg font-medium hover:bg-orange-500 disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Become a Member"}
          </button>
        </div>
      </form>
    </div>
  );
}