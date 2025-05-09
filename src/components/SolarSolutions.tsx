import React from "react";
import { FiDollarSign } from "react-icons/fi"; // Example icons
import Image from "next/image";

export default function SolutionCard() {
  return (
    <div className="mt-5 md:p-6  p-0  flex justify-center  items-center">
      <div className="rounded-2xl bg-[#f5f7fc] py-8 max-w-[1400px] mx-auto ">
        {" "}
        {/* Light background */}
        {/* Container for the section */}
        <div className="container mx-auto  text-center  ">
          {/* Tagline */}
          <div className="mb-6 inline-block rounded-full bg-primary px-3  py-1 text-xs font-bold   text-white leading-loose  tracking-[0.2em]">
            WHY CHOOSE US
          </div>

          {/* Main Headline */}
          <h1 className="mb-6  md:text-5xl text-2xl font-medium leading-tight text-[#000000] px-4">
            Experience the Tradifier Benefit Evolving Your <br /> Corporate for
            Achievement
          </h1>

          {/* Sub-Section (Two Columns) */}

          <div className="md:mx-7 mx-4 mt-10 grid grid-cols-1 gap-4 md:gap-2 md:grid-cols-[68%_32%]">
            {/* First Card */}
            <div className="rounded-[28px] bg-white md:p-5 p-4 text-left shadow-md ">
              <div className="mb-7 flex items-center justify-between ">
                <div>
                  <h2 className="text-lg md:text-[23px] 2xl:text-[32px] font-medium ">
                    Buy, sell, and recycle solar and IT solutions
                  </h2>
                </div>
                <div className="flex items-center justify-end -mt-5 md:-mt-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5ff]">
                    <Image
                      src="/section.png"
                      alt="hero"
                      height={20}
                      width={20}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-12">
                <p className="jusfify-start flex text-left text-lg font-normal">
                  Tradifier lets you buy, sell, and recycle solar and IT
                  solutions, connecting <br /> you with trusted suppliers for
                  responsible upgrades and sustainability.
                </p>
              </div>
            </div>

            {/* Second Card */}
            <div className="md:mx-3 mx-0 rounded-[28px] bg-white px-4 py-4 shadow-md">
              <div className="mb-3 flex items-center justify-between ">
                <div className="flex justify-start">
                  <h2 className="text-left text-lg md:text-[22px] 2xl:text-[32px] font-medium">
                    Competitive Pricing & Bulk <br /> Discounts for ROI
                  </h2>
                </div>

                <div className="flex items-center justify-end ">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5ff] -mt-7">
                    <Image
                      src="/section2.png"
                      alt="hero"
                      height={20}
                      width={20}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-12">
                <p className="jusfify-start flex text-left text-lg font-normal">
                  Enjoy competitive pricing and bulk discounts for maximum ROI.
                </p>
              </div>
            </div>
          </div>


          
          <div className="md:mx-7 mx-4 mt-5 grid grid-cols-1 gap-4 md:gap-2 md:grid-cols-[32%_68%]">
            {/* Second Card */}
            <div className=" rounded-[28px] bg-white px-4 py-4 shadow-md">
              <div className="mb-3 flex items-center justify-between ">
                <div className="flex justify-start">
                  <h2 className="text-left md:text-[22px] 2xl:text-[32px] text-lg font-medium">
                    Real-Time Data and Market Insights
                  </h2>
                </div>

                <div className="flex items-center justify-end ">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5ff] -mt-7">
                    <Image
                      src="/section3.png"
                      alt="hero"
                      height={20}
                      width={20}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-12">
                <p className="jusfify-start flex text-left text-lg font-normal  ">
                  Stay Ahead with Real-Time Data and Market Insights{" "}
                </p>
              </div>
            </div>
            {/* First Card */}
            <div className="rounded-[28px] bg-white p-5 shadow-md md:mx-3 ">
              <div className="mb-7 flex items-center justify-between ">
                <div>
                  <h2 className="font- text-left md:text-[23px] font-medium 2xl:text-[32px] text-lg">
                    Global network of verified suppliers, Buyers and recyclers
                    you can trust{" "}
                  </h2>
                </div>
                <div className="flex items-center justify-end ">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5ff] -mt-8">
                    <Image
                      src="/section4.png"
                      alt="hero"
                      height={20}
                      width={20}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-12">
                <p className="jusfify-start flex text-left text-lg font-normal">
                  Access a global network of verified suppliers, buyers, and
                  recyclers you can trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
