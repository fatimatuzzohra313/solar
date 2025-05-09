import React from "react";
import { Globe, Archive, PiggyBank, Leaf, ArrowUpRight } from "lucide-react";

const WhyJoinTradifier = () => {
  const benefits = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description: "Connect with suppliers and buyers worldwide",
      stat: "150+ Countries",
    },
    {
      icon: <Archive className="h-8 w-8" />,
      title: "Diverse Inventory",
      description: "Comprehensive selection of equipment and inventory",
      stat: "50K+ Products",
    },
    {
      icon: <PiggyBank className="h-8 w-8" />,
      title: "Competitive Pricing",
      description: "Below-market rates and bulk purchase discounts",
      stat: "Save 40%+",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainable Solutions",
      description: "Contribute to an empowered future",
      stat: "100% Green",
    },
  ];

  return (
    <div className=" mx-3 mt-24 md:mx-10 ">
      <div className="max-w-[1400px] rounded-3xl bg-[#f5f7fc] px-4 py-10 2xl:mx-auto">
        <div className="relative mb-20">
          <div className="relative">
            <div className="flex flex-col items-start justify-between gap-10 px-12 md:flex-row">
              <h2 className="-ml-12 max-w-xl text-nowrap text-3xl font-medium leading-tight text-[#161e3c] md:text-7xl">
                Why Join{""}
                <span className="text-[#f6660d] md:block"> Tradifier</span>
              </h2>
              <div className="w-full rounded-2xl bg-white p-6  md:max-w-sm">
                <p className="text-lg text-gray-600">
                  Join thousands of businesses revolutionizing their trade
                  operations through our innovative platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section with Unique Layout */}
        <div className="mb-20 grid max-w-[1440px] grid-cols-1 gap-6  md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-[#fff] opacity-0  transition-opacity duration-500" />

              <div className="relative mx-1 rounded-3xl border border-white/10 bg-[#ffffff] p-8 px-4 py-2 transition-all duration-300 hover:border-[#f6660d]/50">
                {/* Stat Badge */}
                <div className="absolute right-6 top-6 rounded-full bg-[#fff] px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold text-[#f6660d]">
                    {benefit.stat}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f5f7fc] text-[#161e3c]">
                    {benefit.icon}
                  </div>

                  <div>
                    <h3 className="mb-2  text-2xl font-medium text-black md:text-4xl">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>

                  <div className="border-t border-white/10 pt-4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section with Dynamic Design */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-[#161e3c]" />
          <div className="relative rounded-3xl bg-gradient-to-r from-[#161e3c]/80 to-[#161e3c]/95 p-14 backdrop-blur-sm md:p-16">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Ready to Transform Your Trading?
                </h3>
                <p className="text-gray-300">
                  Start your journey with Tradifier today
                </p>
              </div>

              <button className="group relative rounded-3xl bg-[#fff] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#f6660d]/90">
                <span className="relative z-10 flex items-center gap-2 text-black">
                  Start Free Trial
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinTradifier;
