import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="px- relative -mt-16 flex h-[97vh] w-full items-center justify-center overflow-hidden bg-[#ffffff] md:-mt-1 md:h-[83vh]">
      {/* Video Container with Rounded Corners */}
      <div className="relative mx-auto h-[82%] w-full max-w-[calc(100%-22px)] overflow-hidden rounded-[30px] md:h-full md:max-w-[calc(100%-44px)]">
        {/* Background Video */}
        <video
          className="absolute left-0 top-0 h-full w-full  rounded-2xl object-cover"
          src="/Herosection.mp4"
          autoPlay
          loop
          muted
        ></video>

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 z-0 rounded-[24px] bg-black opacity-30"></div>

        {/* Overlaying content */}
        <div className=" absolute bottom-0 left-0 right-0 z-10 mt-12 flex rounded-[28px] px-5 py-14 md:p-10 ">
          <div
            className="bottom-0  w-full justify-end rounded-2xl bg-[#ffffff] p-[20px] shadow-lg
           md:h-[370px] md:w-[590px] md:p-[30px]"
          >
            {/* Tagline */}
            <div className="mb-4 inline-block rounded-full border-2 border-black px-6 py-2 text-[10px] font-medium md:px-4 md:text-sm">
              Buy, Sell, Recycle. Empower Your Business.
            </div>

            {/* Headline */}
            <h1 className="mb-2 text-[34px]  md:text-[44px] leading-tight ">
              Your Hub for Buying, Selling, and Recycling Solar and IT Assets
            </h1>

            {/* Call to Action Button */}
            <button className="mt-3 rounded-full bg-[#161e3c]  px-5  py-2 text-[20px] text-lg font-medium text-white transition hover:bg-primary md:px-9 md:py-3">
              Join Tradifier Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
