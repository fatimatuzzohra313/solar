import Image from "next/image";
import { BuySvg } from "./home/svg";

export default function SolarSolutionsCard() {
  return (
    <div className="min-h-screen items-center justify-center bg-[#ffffff] ">
      <div className=" mx-3  flex max-w-[1380px] flex-col items-center justify-between gap-2 rounded-3xl bg-[#f5f7fc] px-6 md:mx-8 md:flex-row md:px-24 md:py-16 2xl:mx-auto">
        {/* Right Image Section - Moves to the top on mobile */}
        <div className="flex flex-1 justify-center py-5 md:order-2 md:justify-end">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/SolarSolutionsCard1.jpg"
              alt="Solar panels in a field during sunset"
              className="h-[300px] w-[450px] object-cover md:h-[406px] md:w-[406px]"
              width={496}
              height={406}
            />
          </div>
        </div>

        {/* Left Content */}
        <div className="flex flex-1 flex-col justify-start md:w-[60%] ">
          {/* Buy Button */}
          <div className="mb-6">
            <span className="rounded-full bg-orange-500 px-3 py-0.5 text-sm font-semibold leading-loose tracking-[0.2em] text-white">
              BUY
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[22px] font-medium leading-tight md:text-3xl">
            Discover a wide range of new, used, and refurbished solar & IT
            solutions.
          </h1>

          {/* Description */}
          <p className="py-3 text-lg font-normal leading-snug text-gray-600">
            Discover a diverse selection of new, used, and refurbished solar and
            IT solutions at Tradifier. We offer high-quality, vetted products to
            meet any budget while promoting sustainability and responsible
            choices for your business.
          </p>

          {/* Tags */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3 ">
            {BuySvg?.map((badge, index) => (
              <div
                key={index}
                className="mr-1 flex w-48 items-center whitespace-nowrap rounded-full border border-gray-400 px-1 py-1 text-xs font-semibold tracking-widest text-gray-600"
              >
                <span className="ml-2"> {badge.icon}</span>

                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="mb-4 mt-8 max-w-[220px] rounded-full bg-[#161e3c] px-2 py-3 font-medium text-white transition-colors hover:bg-primary md:px-2 md:py-4">
            Discover More
          </button>
        </div>
      </div>

      <div className="mx-3 mt-5  flex max-w-[1380px] flex-col items-center justify-between gap-2 rounded-3xl bg-[#f5f7fc] px-6 md:mx-8 md:flex-row md:px-24 md:py-16 2xl:mx-auto">
        {/* Left Image Section */}
        <div className="flex flex-1 justify-start py-4">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/sell.png"
              alt="Asset trading with technology in the background"
              className="h-[300px] w-[450px] object-cover md:h-[406px] md:w-[406px]"
              width={496}
              height={406}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-1 flex-col justify-start">
          {/* Buy Button */}
          <div className="mb-6">
            <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold tracking-widest text-white">
              SELL
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[22px] font-medium leading-tight md:text-3xl">
            Maximize your returns and recover value quickly by trading your
            assets with ease.
          </h1>

          {/* Description */}
          <p className="py-3 text-lg font-normal leading-snug text-gray-600">
            At Tradifier, we empower you to maximize your returns by
            facilitating seamless asset trading. Our platform makes it easy to
            recover value quickly, ensuring you can make the most of your
            investments.
          </p>

          {/* Tags */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
            {BuySvg?.map((badge, index) => (
              <div
                key={index}
                className="mr-1 flex w-48 items-center whitespace-nowrap rounded-full border border-gray-400 px-1 py-1 text-xs font-semibold tracking-widest text-gray-600"
              >
                <span className="ml-2"> {badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="mb-5 mt-8 max-w-[220px] rounded-full bg-[#161e3c] px-2 py-3 font-medium text-white transition-colors hover:bg-primary md:px-2 md:py-4">
            Discover More
          </button>
        </div>
      </div>

      <div className="mx-3 mt-3 flex max-w-[1380px] flex-col items-center justify-between gap-2 rounded-3xl bg-[#f5f7fc] px-6 md:mx-8 md:flex-row md:px-24 md:py-16 2xl:mx-auto">
        {/* Right Image Section - Shows first on mobile */}
        <div className="order-1 flex flex-1 justify-center py-6 md:order-2 md:justify-end">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/recile.png"
              alt="Solar panels in a field during sunset"
              className="h-[330px] w-[330px] object-cover md:h-[406px] md:w-[406px]"
              width={496}
              height={406}
            />
          </div>
        </div>

        {/* Left Content */}
        <div className="order-2 flex flex-1 flex-col justify-start md:order-1">
          {/* Buy Button */}
          <div className="mb-6">
            <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold tracking-widest text-white">
              Recycle
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[22px] font-medium leading-tight md:text-3xl">
            Contribute to sustainability with certified recycling solutions.
          </h1>

          {/* Description */}
          <p className="py-3 text-lg font-normal leading-snug text-gray-600">
            At Tradifier, we offer certified recycling solutions that help you
            contribute to sustainability. Our programs ensure that your solar
            and IT assets are recycled responsibly, reducing waste and promoting
            environmental stewardship.
          </p>

          {/* Tags */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
            {BuySvg?.map((badge, index) => (
              <div
                key={index}
                className="mr-1 flex w-48 items-center whitespace-nowrap rounded-full border border-gray-400 px-1 py-1 text-xs font-semibold tracking-widest text-gray-600"
              >
                <span className="ml-2">{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="mb-4 mt-8 max-w-[220px] rounded-full bg-[#161e3c] px-2 py-3 font-medium text-white transition-colors hover:bg-primary md:px-2 md:py-4">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
}
