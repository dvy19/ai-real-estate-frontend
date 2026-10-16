import React from 'react';
import { Phone, Star, MapPin, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export default function BrokerCard({
  name = "Rajesh Sharma",
  contactNumber = "+91 98765 43210",
  rating = 4.8,
  area = "DLF Phase 5",
  city = "Gurgaon",
  onContact = () => {}
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between p-6">
      
      {/* Header Info: Avatar / Icon & Rating */}
      <div>
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">
              {name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full ring-2 ring-white" title="Verified Broker">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Name & Title */}
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          <p className="text-xs font-medium text-gray-400 mt-0.5">Verified Real Estate Agent</p>
        </div>

        {/* Details Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Broker Details List */}
        <div className="space-y-3">
          {/* Area & City */}
          <div className="flex items-start text-gray-600 text-sm gap-2.5">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span className="font-medium text-gray-700">
              {area}, <span className="text-gray-500">{city}</span>
            </span>
          </div>

          {/* Contact Number */}
          <div className="flex items-center text-gray-600 text-sm gap-2.5">
            <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-semibold text-gray-800">{contactNumber}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-2">
        <button
          onClick={onContact}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
        >
          <span>Contact Broker</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

    </div>
  );
}