import React from 'react';
import { Home, ArrowRight, Maximize2, Bed, Home as BHKIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const HousePredictCard = () => {

    const navigate=useNavigate()

  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      
      {/* Icon Container */}
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
        <Home className="w-6 h-6" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Predict House Price
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Estimate property values instantly based on key details like total area, BHK, bedrooms, and amenities.
      </p>

      {/* Feature Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
          <Maximize2 className="w-3 h-3" /> Area (sq ft)
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
          <BHKIcon className="w-3 h-3" /> BHK
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
          <Bed className="w-3 h-3" /> Bedrooms
        </span>
      </div>

      {/* Action Button */}
      <button 
        onClick={()=>{navigate('/house-prediction')}}
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 group cursor-pointer"
      >
        <span>Predict Price</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>

    </div>
  );
};

export default HousePredictCard;