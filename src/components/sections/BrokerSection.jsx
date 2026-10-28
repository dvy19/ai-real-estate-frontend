import React, { useEffect, useRef, useState } from 'react';
import PlotCard from '../cards/PlotCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import HouseCard from '../cards/HouseCard';
import BrokerCard from '../cards/BrokerCard';

import brokerService from '../../services/brokerService'
import { useNavigate } from 'react-router';

export default function BrokerSection() {
  const scrollContainerRef = useRef(null);

  const[brokerData,setBrokerData]=useState([])

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  const[loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const getBrokers=async(pageNumber=1)=>{

    try{

      const response=await brokerService.getBrokers()

      console.log(response)

      setBrokerData(response.brokers)
      const newBrokers = response.brokers;

      setBrokerData(prev =>
        pageNumber === 1 ? newBrokers : [...prev, ...newBrokers]
      );

      setHasMore(
        pageNumber < response.data.pagination.totalPages
      );
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getBrokers()
  },  [])

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
          {brokerData.map((broker) => (
            <div key={broker._id} className="flex-shrink-0 w-[300px] sm:w-[320px]">
              <BrokerCard
                image={broker.image}
                name={broker.name}
                contactNumber={broker.phone}
                rating={broker.rating}
                city={broker.city}
                onContact={()=>{
                  navigate(`/broker-profile/${broker._id}`)}}
              />
            </div>
          ))}

           
        </div>

        {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={getBrokers}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold
                          rounded-lg hover:bg-indigo-700 transition
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "View More Brokers"}
              </button>
            </div>
          )}

       
      </div>
    </section>
  );
}
