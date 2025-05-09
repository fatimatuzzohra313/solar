/* eslint-disable react/no-unescaped-entities */
import React from "react";

const DemoHero = () => {
  return (
    <div className="relative bg-[#fff]">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_70%,rgba(251,146,60,0.1))]" />

        {/* Circuit-like pattern */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-24 bg-orange-500"
              style={{
                top: `${20 + i * 15}%`,
                right: `${30 + (i % 3) * 20}%`,
                transform: `rotate(${45 + i * 15}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 lg:py-24">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Pre-heading badge - Centered */}
            <h1 className="relative z-10 md:mx-24 max-w-7xl text-center text-3xl font-medium tracking-tight text-black  sm:text-4xl lg:text-5xl">
              <span className="block md:leading-tight">
                Tradifier: Your Global Hub for Trading Solar and IT Resources
              </span>
              <span className="mt-2 block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"></span>
            </h1>
            {/* Mission statement - Centered */}
            <div className=" max-w-5xl text-center">
              <p className="text-xl leading-relaxed text-gray-600">
              Sign up now and experience the Tradifier difference.
              </p>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoHero;
