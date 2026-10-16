import React, { useRef } from 'react';
import PlotCard from '../cards/PlotCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import HouseCard from '../cards/HouseCard';

export default function PlotSection({ plots = defaultHouses }) {
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
    <section className="bg-gray-50 py-12 m-4 px-4 sm:px-6 lg:px-8" id="houses">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Featured Properties
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Explore Available Houses
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse top residential and commercial Houses listings in prime locations.
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
              <HouseCard
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

export const defaultHouses = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    price: "₹1.45 Cr",
    area: "2,400 sq.ft",
    location: "Sector 45, Gurgaon, HR",
    contactNumber: "+91 98765 43210"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    price: "₹2.10 Cr",
    area: "3,200 sq.ft",
    location: "Jubilee Hills, Hyderabad, TS",
    contactNumber: "+91 98123 45678"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000",
    price: "₹1.85 Cr",
    area: "2,800 sq.ft",
    location: "Koramangala, Bengaluru, KA",
    contactNumber: "+91 97654 32109"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000",
    price: "₹98,00,000",
    area: "1,950 sq.ft",
    location: "Gomti Nagar, Lucknow, UP",
    contactNumber: "+91 95432 10987"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    price: "₹2.65 Cr",
    area: "3,600 sq.ft",
    location: "Koregaon Park, Pune, MH",
    contactNumber: "+91 94321 09876"
  }
];