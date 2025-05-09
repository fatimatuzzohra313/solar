// @ts-nocheck

"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import generator from 'generate-password';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/feature/auth/authSlice';
import { useRegisterMutation } from '@/lib/feature/auth/auththunk';

const RegistrationForm = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companyRole: "",
    phone: "",
    state: "",
    country: "",
    termsAccepted: false,
    userType: "IT", // Default to IT
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, companyName, companyRole, phone, state, country, termsAccepted } = formData;
    
    if (!firstName || !lastName || !email || !companyName || !companyRole || !phone || !state || !country) {
      toast.error("Please fill out all the fields.");
      return false;
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const generatedPassword = generator.generate({
      length: 8,
      numbers: true,
    });

    const userRegistrationData = {
      ...formData,
      password: generatedPassword,
    };
    
    try {
      const result = await register(userRegistrationData).unwrap();
      
      // Check if we have the complete user data and token
      if (result?.token) {
        // Dispatch the complete user data to Redux
        dispatch(setCredentials({
          ...result.user,
          token: result.token
        }));

        toast.success("Registration successful!");
        
        // Add a small delay to ensure the toast is visible
        setTimeout(() => {
          // Redirect to dashboard based on user type
          const dashboardPath = formData.userType === 'IT' ? '/dashboard' : '/dashboard';
          router.push(dashboardPath);
        }, 1500);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const errorMessage = error?.message || error?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      return;
    }
  };

  const companyRoles = {
    IT: ["Manufacturer", "Supplier/Reseller", "Other"],
    Solar: ["Installer","EPC","Developer", "O&M", "Utility / IPP / Co-Op","Distributor","Manufacturer" , "Broker", "Supplier/Reseller", "Other"],
  };


 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="items-center gap-0 max-w-5xl w-full shadow-md">
        <div className="border border-gray-300 rounded-lg p-6 max-w-3xl shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">Register</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Create your account and start your journey with us. Fill in your details below.
              </p>
            </div>

            {/* User Type Selector */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-lg border border-gray-300 p-1">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    formData.userType === 'IT'
                      ? 'bg-[#f97316] text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setFormData({ ...formData, userType: "IT", companyRole: "" })}
                >
                  IT User
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    formData.userType === 'Solar'
                      ? 'bg-[#161e3c] text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setFormData({ ...formData, userType: "Solar", companyRole: "" })}
                >
                  Solar User
                </button>
              </div>
            </div>

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                <input 
                  name="firstName" 
                  type="text" 
                  required 
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                <input 
                  name="lastName" 
                  type="text" 
                  required 
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Remaining form fields remain the same */}
            {/* Email */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Company fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Company Name</label>
                <input 
                  name="companyName" 
                  type="text" 
                  required 
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Company Role</label>
                <select
                  name="companyRole"
                  required
                  value={formData.companyRole}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg"
                  onChange={handleChange}
                >
                  <option value="" disabled>Select company role</option>
                 {companyRoles[formData.userType].map((role , index)=>(
                  <option key={index} value={role}>
                  {role}
                </option>
                 ))}
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="text-gray-800 text-sm mb-2 block">Phone Number</label>
                <input 
                  name="phone" 
                  type="tel" 
                  required 
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-800 text-sm mb-2 block">State</label>
                <input 
                  name="state" 
                  type="text" 
                  required 
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-800 text-sm mb-2 block">Country</label>
                <input 
                  name="country" 
                  type="text" 
                  required 
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-6">
              <input 
                id="terms" 
                name="termsAccepted" 
                type="checkbox"
                required
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-800">
                I accept the <a href="#" className="text-primary hover:underline">terms and conditions</a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="!mt-8">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-[#f97316] hover:bg-primary focus:outline-none transition-colors"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>

            <p className="text-sm !mt-8 text-center text-gray-800">
              Already have an account? <a href="/signIn" className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap">Sign in here</a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;