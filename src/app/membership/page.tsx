import WhyJoinTradifier from "@/components/join";
import LandingLayout from "@/components/Layouts/LandingLayout";
import MemeberPlan from "@/components/memeberPlan";
import React from "react";

export default function MemberShip() {
  return (
    <LandingLayout>
      <div className="overflow-x-hidden">
        <section className="relative mt-4   h-[370px] ">
          <div className="mx-auto max-w-screen-xl px-4 py-4 text-center lg:py-16">
            <h1 className=" md:px-24 text-4xl font-medium leading-none tracking-tight text-[#161e3c] md:text-5xl lg:text-5xl">
            Join Tradifier - Access Premium Trading Features With No Upfront Cost            </h1>
            <p className="text-black mb-8 text-lg font-normal sm:px-16 lg:px-48 lg:text-xl mt-10">
            Choose from a variety of membership plans designed to fit the
              unique needs of solar professionals, with scalable options for any
              business size.
            </p>
            <div className="mt-4">
        <button className="px-8 py-3 bg-[#161e3c] hover:bg-primary text-white text-lg font-medium rounded-full  transition duration-300">
          Free Sign Up
        </button>
      </div>
          </div>
        </section>

        <section id="plans">
          <MemeberPlan />
          <WhyJoinTradifier/>
        </section>
      </div>
    </LandingLayout>
  );
}
