import React from 'react';
import { ArrowRight, Clock, Tag, Globe, LineChart } from 'lucide-react';

const MembershipBenefits = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-[#f6660d]" />,
      title: "First 3 Months Free",
      description: "Start your journey with no commitment - experience all premium features completely free."
    },
    {
      icon: <Tag className="w-8 h-8 text-[#f6660d]" />,
      title: "Exclusive Pricing",
      description: "Get access to special member-only rates and premium features at unbeatable prices."
    },
    {
      icon: <Globe className="w-8 h-8 text-[#f6660d]" />,
      title: "Trusted Global Network",
      description: "Join our worldwide community of members and access global resources."
    },
    {
      icon: <LineChart className="w-8 h-8 text-[#f6660d]" />,
      title: "Real-Time Data",
      description: "Stay ahead with instant access to live updates and analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fff] py-8 px-4 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-medium  mb-6 text-[#161e3c]">
            Why Become a Member?
          </h1>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Join our exclusive community and unlock premium benefits designed to enhance your experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:mx-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-[#f5f7fc] rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-[#ffffff] rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-black text-xl font-semibold mb-3">
                {benefit.title}
              </h3>
              <p className="">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-[#161e3c] hover:bg-[#f6660d]/90 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto group transition-all duration-300">
            Claim 3 Months Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipBenefits;