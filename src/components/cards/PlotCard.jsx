import React from 'react';
import { MapPin, Maximize, ArrowRight } from 'lucide-react';

export default function PlotCard({
  image ,
  location,
  price ,
  area ,
  onViewDetails = () => {}
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between">
      <div>
        {/* Plot Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={location}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Plot For Sale
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3 space-y-4">
          {/* Price */}
          <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {price}
          </div>

          {/* Location Info */}
          <div className="flex items-start text-gray-600 text-sm gap-1">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span className="line-clamp-1 font-medium">{location}</span>
          </div>

          {/* Area Specification */}
          <div className="flex items-center text-gray-700 bg-gray-50 rounded-xl p-2 border border-gray-100">
            <Maximize className="w-4 h-4 text-indigo-600 mr-2.5" />
            <span className="text-xs text-gray-500 font-medium mr-1">Plot Area:</span>
            <span className="text-sm font-semibold text-gray-900">{area}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="p-5 pt-0">
        <button
          onClick={onViewDetails}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}