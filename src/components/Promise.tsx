/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from 'react';
import { ArrowUpRight, Recycle, DollarSign, Globe, Workflow } from 'lucide-react';

const TradifierPromise = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const promises = [
    {
      title: 'Simplify',
      description: 'Business processes for professionals in solar and IT',
      icon: <Workflow className="w-6 h-6" />,
      color: '#161e3c'
    },
    {
      title: 'Connect',
      description: 'A global network of buyers and sellers, fostering new opportunities',
      icon: <Globe className="w-6 h-6" />,
      color: '#161e3c'
    },
    {
      title: 'Empower',
      description: 'Businesses to optimize their budgets',
      icon: <DollarSign className="w-6 h-6" />,
      color: '#161e3c'
    },
    {
      title: 'Promote',
      description: 'The reuse and responsible disposal of equipment',
      icon: <Recycle className="w-6 h-6" />,
      color: '#161e3c'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fff] relative overflow-hidden">
      {/* Wave SVG Background */}
    

      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#161e3c] mb-4">
            The Tradifier Promise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Tradifier, we're committed to delivering value at every step, whether you're sourcing critical infrastructure or turning unused assets into profit.
          </p>
        </div>

        <div className="relative">
          {/* Hexagonal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {promises.map((promise, index:any) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute inset-0  rounded-lg transform rotate-3 bg-[#161e3c] opacity-20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105" />
                <div 
                  className={`relative p-6 backdrop-blur-sm bg-[#ffffff] rounded-lg transition-all duration-300 
                    ${hoveredIndex === index ? 'transform -translate-y-2' : ''}`}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-4 -translate-y-4">
                    <div 
                      className="w-full h-full rounded-full opacity-10"
                      style={{ backgroundColor: promise.color }}
                    />
                  </div>
                  
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white transition-all duration-300"
                      style={{ backgroundColor: promise.color }}
                    >
                      {promise.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#161e3c] mb-2 flex items-center gap-2">
                      {promise.title}
                      <ArrowUpRight 
                        className={`w-5 h-5 transition-all duration-300 ${
                          hoveredIndex === index ? 'translate-x-1 -translate-y-1' : ''
                        }`}
                      />
                    </h3>
                    
                    <p className="text-gray-600">
                      {promise.description}
                    </p>
                    
                    {/* Bottom decoration */}
                    <div className="absolute bottom-0 right-0 w-32 h-1 transform translate-y-4">
                      <div 
                        className="w-full h-full rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: promise.color,
                          opacity: hoveredIndex === index ? 0.2 : 0.1
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 transform translate-x-32 translate-y-32">
        <div className="w-full h-full rounded-full bg-[#161e3c] opacity-5" />
      </div>
      <div className="absolute top-0 left-0 w-48 h-48 transform -translate-x-24 -translate-y-24">
        <div className="w-full h-full rounded-full bg-[#f6660d] opacity-5" />
      </div>
    </div>
  );
};

export default TradifierPromise;