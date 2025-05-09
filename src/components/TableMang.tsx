// @ts-nocheck

import React from 'react';
import { AlertCircle, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Add keyframes for various animations
const style = document.createElement('style');
style.textContent = `
  @keyframes wave {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 1000;
    }
  }
`;
document.head.appendChild(style);

const TableStateWrapper = ({ children, className = "" }) => (
  <div className={`flex min-h-[500px] w-full items-center justify-center bg-white p-8 rounded-xl shadow-lg ${className}`}>
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      {children}
    </div>
  </div>
);

const TableLoader = () => (
  <TableStateWrapper className="bg-gradient-to-b from-white to-gray-50">
    <div className="relative flex flex-col items-center">
      {/* Main loader animation */}
      <div className="relative h-32 w-32">
        {/* Decorative background circles */}
        <div className="absolute inset-0 animate-[pulse_2s_ease-in-out_infinite]">
          <div className="absolute inset-0 rounded-full bg-[#f6660d]/5" />
          <div className="absolute inset-2 rounded-full bg-[#f6660d]/10" />
          <div className="absolute inset-4 rounded-full bg-[#f6660d]/15" />
        </div>

        {/* Spinning elements */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          <div className="absolute h-3 w-3 rounded-full bg-[#f6660d] blur-[2px]" 
               style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className="absolute h-3 w-3 rounded-full bg-[#f6660d] blur-[2px]"
               style={{ top: '50%', right: '0%', transform: 'translate(50%, -50%)' }} />
          <div className="absolute h-3 w-3 rounded-full bg-[#f6660d] blur-[2px]"
               style={{ bottom: '0%', left: '50%', transform: 'translate(-50%, 50%)' }} />
          <div className="absolute h-3 w-3 rounded-full bg-[#f6660d] blur-[2px]"
               style={{ top: '50%', left: '0%', transform: 'translate(-50%, -50%)' }} />
        </div>

        {/* Center spinning ring */}
        <div className="absolute inset-4 animate-[spin_2s_linear_infinite_reverse] rounded-full border-4 border-[#f6660d]/30 border-t-[#f6660d]" />
        
        {/* Pulsing center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-6 w-6 animate-[pulse_1.5s_ease-in-out_infinite]">
            <div className="h-full w-full rounded-full bg-[#f6660d]/80 blur-[4px]" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="h-1.5 w-1.5 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-[#f6660d]" />
          <div className="h-1.5 w-1.5 animate-[pulse_1s_ease-in-out_infinite_0.2s] rounded-full bg-[#f6660d]" />
          <div className="h-1.5 w-1.5 animate-[pulse_1s_ease-in-out_infinite_0.4s] rounded-full bg-[#f6660d]" />
        </div>
        <p className="text-lg font-medium text-gray-600">Loading your data</p>
        <p className="text-sm text-gray-400">Please wait a moment...</p>
      </div>
    </div>
  </TableStateWrapper>
);

const TableError = ({ onRetry }) => (
  <TableStateWrapper className="bg-gradient-to-b from-white to-red-50/30">
    <div className="flex flex-col items-center space-y-6">
      {/* Error icon with animation */}
      <div className="relative">
        <div className="absolute -inset-4 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-red-100/50" />
        <div className="relative animate-[float_3s_ease-in-out_infinite]">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
      </div>

      {/* Error message */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">Unable to Load Data</h3>
        <p className="max-w-sm text-sm text-gray-500">
          We encountered an issue while fetching your information. Please try again.
        </p>
      </div>

      {/* Retry button with hover effect */}
      <Button 
        onClick={onRetry}
        className="group relative overflow-hidden bg-[#f6660d] px-6 py-2 transition-all hover:shadow-lg hover:shadow-[#f6660d]/30"
      >
        <span className="relative z-10 font-medium text-white">
          Retry Now
        </span>
        <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />
      </Button>
    </div>
  </TableStateWrapper>
);

const TableEmpty = ({ message = "No data available" }) => (
  <TableStateWrapper className="bg-gradient-to-b from-white to-gray-50">
    <div className="flex flex-col items-center space-y-6">
      {/* Empty state illustration */}
      <div className="relative">
        <div className="absolute -inset-4 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[#f6660d]/5" />
        <div className="relative animate-[float_3s_ease-in-out_infinite]">
          <div className="rounded-full bg-[#f6660d]/10 p-4">
            <Search className="h-12 w-12 text-[#f6660d]" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">No Results Found</h3>
        <p className="max-w-sm text-sm text-gray-500">{message}</p>
      </div>

      {/* Decorative elements */}
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="h-1 w-1 rounded-full bg-[#f6660d]/30"
            style={{
              animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>
    </div>
  </TableStateWrapper>
);

export { TableLoader, TableError, TableEmpty };