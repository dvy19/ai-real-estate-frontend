import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Bed, 
  Bath, 
  Layers, 
  Maximize2, 
  Car, 
  Sofa, 
  MapPin, 
  Calculator, 
  RotateCcw, 
  TrendingUp, 
  Info, 
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import mlService from '../services/mlService';

export default function HousePrediction() {
  // Initial form values
  const initialFormState = {
    area: '1200',
    floors: '2',
    bedrooms: '3',
    bathrooms: '2',
    bhk: '3',
    propertyType: 'Apartment',
    furnished: 'Semi-Furnished',
    parking: '1 Vehicle',
    city: 'Bangalore'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Options for select dropdowns
  const propertyTypes = ['Apartment', 'Independent House', 'Villa', 'Penthouse', 'Builder Floor'];
  const furnishedStatuses = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
  const parkingOptions = ['No','Yes'];
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form to defaults
  const handleReset = () => {
    setFormData(initialFormState);
    setResult(null);
  };

  const calculate=async()=>{

    try{

        const data=await mlService.predictHousePrice(formData)

        console.log(data)
    }
    catch(err){
        console.log(err)
    }

  }



  // Helper to format numbers into Indian Lakhs / Crores standard or comma format
  const formatCurrency = (val) => {
    if (!val) return '₹ 0';
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Home className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                House Price Valuation
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Enter your property details below to calculate an estimated market price.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" /> AI Valuation Engine
          </span>
        </header>

        {/* Main Form Box */}
        <form onSubmit={calculate} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Property Details
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Inputs
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* City */}
            {/* Area (sq ft) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Area (sq ft) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. 1200"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Property Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area (sq ft) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Area (sq ft) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Maximize2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  name="area"
                  min="100"
                  step="0.01"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. 1200"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* BHK */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                BHK (Bed, Hall, Kitchen) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Home className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  name="bhk"
                  min="1"
                  max="20"
                  value={formData.bhk}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Bed className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  name="bedrooms"
                  min="1"
                  max="20"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Bathrooms <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Bath className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  name="bathrooms"
                  min="1"
                  max="20"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Floors */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Total Floors <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  name="floors"
                  min="1"
                  max="100"
                  value={formData.floors}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Furnished */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Furnished Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Sofa className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                >
                  {furnishedStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Parking */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Parking Facility <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Car className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition"
                  required
                >
                  {parkingOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Action Button Section */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
            <button
            
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-indigo-200 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating Price...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4" />
                  Predict Price
                </>
              )}
            </button>
          </div>
        </form>

        {/* Prediction Results Display Section */}
        {result && (
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-800 animate-fadeIn space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-indigo-800/80 pb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                  Estimated Property Value
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {formatCurrency(result.totalPrice)}
                </h3>
              </div>
              <div className="text-left sm:text-right bg-indigo-950/60 px-4 py-2.5 rounded-xl border border-indigo-700/50">
                <span className="text-xs text-indigo-300 block">Avg Rate per Sq Ft</span>
                <span className="text-lg font-bold text-emerald-400">
                  ₹ {result.avgSqftPrice.toLocaleString('en-IN')} / sq ft
                </span>
              </div>
            </div>

            {/* Price Range & Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
                <span className="text-xs text-indigo-300 font-medium block mb-1">Estimated Range</span>
                <p className="text-base font-semibold text-slate-100">
                  {formatCurrency(result.minPrice)} - {formatCurrency(result.maxPrice)}
                </p>
              </div>

              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
                <span className="text-xs text-indigo-300 font-medium block mb-1">Selected Location</span>
                <p className="text-base font-semibold text-slate-100 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-400 inline" /> {formData.city}
                </p>
              </div>

              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
                <span className="text-xs text-indigo-300 font-medium block mb-1">Configuration</span>
                <p className="text-base font-semibold text-slate-100">
                  {formData.bhk} BHK • {formData.propertyType}
                </p>
              </div>
            </div>

            {/* Summary Highlights */}
            <div className="bg-indigo-950/20 p-4 rounded-xl border border-indigo-800/30 text-xs text-indigo-200 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
              <span>
                Valuation factors in a <strong>{formData.furnished}</strong> {formData.propertyType} in <strong>{formData.city}</strong> with {formData.parking} parking.
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}