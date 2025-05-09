import React from 'react';

const ModernFeatures = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-color-swatch"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
          <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
          <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
          <line x1="17" y1="17" x2="17" y2="17.01"></line>
        </svg>
      ),
      title: "Buy",
      description: "Discover new, used, and refurbished solutions for solar and IT sectors."
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-bolt"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
        </svg>
      ),
      title: "Sell",
      description: "List your inventory and equipment to a global audience and recoup value quickly."
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-tools"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
          <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
          <polyline points="12 8 7 3 3 7 8 12"></polyline>
          <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
          <polyline points="16 12 21 17 17 21 12 16"></polyline>
          <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
        </svg>
      ),
      title: "Recycle",
      description: "Partner with certified recyclers to responsibly dispose of old or non-functional resources."
    }
  ];

  return (
    <div className="bg-white">
      <section className="relative px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-block rounded-full bg-orange-500 px-3 py-1.5 text-sm font-bold uppercase tracking-[0.2rem] text-white">
            Why Choose Us
          </div>
          <h2 className="mb-8 text-4xl font-medium text-gray-900 md:text-5xl">
            Tradifier simplifies your asset lifecycle
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-600">
            Tradifier is at the forefront of revolutionizing asset trading for the solar and IT industries.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white p-8 transition-all hover:bg-orange-50 shadow-xl"
            >
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-500/10 transition-transform group-hover:scale-150" />
              <div className="absolute -left-4 -bottom-4 h-32 w-32 rounded-full bg-orange-500/5 transition-transform group-hover:scale-150" />
              
              {/* Content */}
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <div className="h-px flex-1 bg-orange-500/20 mx-4" />
                </div>
                
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mt-6 flex items-center text-orange-500 font-medium">
                  Learn more
                  <svg 
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ModernFeatures;