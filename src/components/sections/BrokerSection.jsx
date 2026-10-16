import React, { useRef } from 'react';
import PlotCard from '../cards/PlotCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import HouseCard from '../cards/HouseCard';
import BrokerCard from '../cards/BrokerCard';

export default function BrokerSection({ plots = defaultBrokers }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Approx card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-gray-50 py-12 m-4 px-4 sm:px-6 lg:px-8" id="plots">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Featured Properties
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
             Contact Brokers
            </h2>
            <p className="mt-1 text-sm text-gray-500">
                Get in Contact of Brokers Near you
                </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 shadow-sm focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 shadow-sm focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-1 -mx-1"
          style={{
            scrollbarWidth: 'none', // Hide scrollbar Firefox
            msOverflowStyle: 'none', // Hide scrollbar IE/Edge
          }}
        >
          {plots.map((plot) => (
            <div key={plot.id} className="flex-shrink-0 w-[300px] sm:w-[320px]">
              <BrokerCard
                image={plot.image}
                location={plot.location}
                price={plot.price}
                area={plot.area}
                onViewDetails={() => console.log(`Viewing plot ${plot.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export const defaultBrokers = [
  {
    id: 1,
    name: "Rajesh Sharma",
    contactNumber: "+91 98765 43210",
    rating: 4.9,
    area: "DLF Phase 5",
    city: "Gurgaon"
  },
  {
    id: 2,
    name: "Ananya Reddy",
    contactNumber: "+91 98123 45678",
    rating: 4.8,
    area: "Gachibowli",
    city: "Hyderabad"
  },
  {
    id: 3,
    name: "Siddharth Mehta",
    contactNumber: "+91 97654 32109",
    rating: 4.7,
    area: "Koramangala",
    city: "Bengaluru"
  },
  {
    id: 4,
    name: "Vikram Malhotra",
    contactNumber: "+91 95432 10987",
    rating: 4.6,
    area: "Koregaon Park",
    city: "Pune"
  },
  {
    id: 5,
    name: "Pooja Verma",
    contactNumber: "+91 94321 09876",
    rating: 4.9,
    area: "Gomti Nagar",
    city: "Lucknow"
  }
];