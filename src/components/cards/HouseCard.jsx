import React from 'react';
import { MapPin, Maximize, Phone, ArrowRight, Home } from 'lucide-react';

export default function HouseCard({
  image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
  price = "₹1.45 Cr",
  area = "2,400 sq.ft",
  location = "Sector 45, Gurgaon, HR",
  contactNumber = "+91 98765 43210",
  onViewMore = () => {}
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between">
      
      {/* Top Content Area */}
      <div>
        {/* House Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={location}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Status Badge */}
          <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Home className="w-3 h-3" />
            <span>House</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          
          {/* Price & Area Row (Aligned Side-by-Side) */}
          <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-xs text-gray-400 font-medium block">Price</span>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {price}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 font-medium block">Built-up Area</span>
              <div className="flex items-center text-sm font-semibold text-gray-800 gap-1 mt-0.5">
                <Maximize className="w-3.5 h-3.5 text-indigo-600" />
                <span>{area}</span>
              </div>
            </div>
          </div>

          {/* Details Stack with Strict Alignment */}
          <div className="space-y-2.5">
            {/* Location */}
            <div className="flex items-start text-gray-600 text-sm gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1 font-medium">{location}</span>
            </div>

            {/* Contact Number */}
            <div className="flex items-center text-gray-600 text-sm gap-2.5">
              <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-medium text-gray-800">{contactNumber}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Card Footer Action */}
      <div className="p-5 pt-0">
        <button
          onClick={onViewMore}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
        >
          <span>View More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

    </div>
  );
}