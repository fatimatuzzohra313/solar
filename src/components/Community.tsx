import Image from "next/image";

const CommunitySection = () => {
  return (
    <section className="flex flex-col items-center py-12 lg:flex-row lg:justify-between lg:space-x-8 lg:px-6 max-w-[1300px] mx-auto">
      <div className="text-center lg:text-left">
        <div className="mb-4 inline-block rounded-full bg-orange-500 px-3 py-1 text-sm font-bold uppercase tracking-[0.2rem] text-white">
          Our Community
        </div>
        <h2 className="text-xl font-medium leading-tight tracking-tight lg:text-4xl">
          Together We Thrive: The Tradifier Community
        </h2>
        <p className="mb-3">
          Join a thriving community of B2B industry leaders and reshape the way
          inventory, and equipment is bought, sold, and recycled.
        </p>
        <ul className="mb-8 space-y-4 w-[60%] md:w-[70%] mx-auto lg:mx-0">
          <li>
            <span className="font-semibold">● Solar Brokers:</span> Find rare
            components and leverage our bulk pricing.
          </li>
          <li>
            <span className="font-semibold">● IT Service Providers:</span>{" "}
            Access high-end equipment and connect with global buyers.
          </li>
        </ul>
        <button className="rounded-full bg-[#161e3c] px-6 py-3 text-lg font-semibold text-white transition hover:bg-primary hover:text-white">
          Join the Tradifier Community
        </button>
      </div>

      <div className="mt-8 flex flex-col space-y-4 w-full lg:w-[55%] lg:space-y-0 lg:space-x-4 lg:flex-row items-center lg:items-end">
        {/* First Image - Smaller height on desktop, full width on mobile */}
        <div className="h-[200px] w-full md:w-1/2 overflow-hidden rounded-3xl hidden md:inline-block ">
          <Image
            src="/Community1.png"
            alt="IT Service Providers"
            className="object-cover w-full h-full"
            width={500}
            height={800}
          />
        </div>

        {/* Second Image - Larger height on desktop, full width on mobile */}
        <div className="h-[300px] w-[90%]  md:w-1/2 overflow-hidden rounded-3xl mx-12 md:mx-0">
          <Image
            src="/Community2.png"
            alt="Solar Brokers"
            className="object-cover w-full h-full"
            width={500}
            height={800}
          />
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
