import React, { useEffect, useRef, useState } from 'react';
import PlotCard from '../cards/PlotCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import { useNavigate } from 'react-router';

import plotService from '../../services/plotService'
import { useSearchParams } from 'react-router';
export default function PlotSection() {
  const scrollContainerRef = useRef(null);

  const[plots,setPlots]=useState(defaultPlots)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Approx card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const navigate=useNavigate()

  const getPlots=async()=>{

    console.log("plot trying")

    try{

      const plots=await plotService.getAllPlots()

      console.log(plots)
      console.log("plot data")

      setPlots(plots.plots)


    }
    catch(err){
      console.log(err)
    }
  }

    useEffect(() => {
      getPlots();
    }, []);

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
              Explore Available Plots
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse top residential and commercial plot listings in prime locations.
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
            <div key={plot._id} className="flex-shrink-0 w-[300px] sm:w-[320px]">
              <PlotCard
                image={plot.image}
                location={plot.location.city}
                price={plot.price}
                area={plot.area.value}
                onViewDetails={() => navigate(`/plot-details/${plot._id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sample Mock Data
const defaultPlots = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    location: 'Sector 62, Gurgaon, HR',
    price: '₹85,00,000',
    area: '1,800 sq.ft',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    location: 'Whitefield, Bengaluru, KA',
    price: '₹1.20 Cr',
    area: '2,400 sq.ft',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    location: 'Gachibowli, Hyderabad, TS',
    price: '₹95,00,000',
    area: '2,000 sq.ft',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    location: 'Noida Extension, UP',
    price: '₹62,00,000',
    area: '1,500 sq.ft',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000',
    location: 'Baner, Pune, MH',
    price: '₹1.10 Cr',
    area: '2,200 sq.ft',
  },
];