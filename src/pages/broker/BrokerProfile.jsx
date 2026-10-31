import React, { useEffect, useState , useRef} from 'react';
import brokerService from '../../services/brokerService';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import chatService from '../../services/chatService';
import { Link } from 'lucide-react';

import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import HouseCard from '../../components/cards/HouseCard';
const BrokerProfile = () => {
  

  const {id}=useParams()

  //console.log(id)

  const [broker,setBroker]=useState({})

  const[schedule,setSchedule]=useState([])

  const navigate=useNavigate()

  const getSchedule=async(id)=>{

    try{

      const data=await brokerService.getBrokerSchedule(id)

      console.log(data)

      console.log(data.availability.schedule)
      setSchedule(data.availability?.schedule || []);

    }
    catch(err){
      console.log(err)
    }
  }


  
  
  const getBroker=async(id)=>{

    try{

        const data=await brokerService.getSingleBroker(id)

        //console.log(data)
        setBroker(data.broker)

        //navigate(`/broker-chat/${broker._id}`)
    }
    catch(err){
        console.log(err)
    }
  }


  useEffect(()=>{
    getBroker(id)
    getSchedule(id)
  } , [id])


  

  const onChat=async(id)=>{

    try{

        const chat=await chatService.createChat(id)

        //console.log(chat)

        navigate(`/broker-chat/${broker?._id}`)
    }
    catch(err){
        console.log(err)
    }
  }


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

  const [houses,setHouses]=useState([])
  const[plots,setPlots]=useState([])

  const getProperties=async(id)=>{

    try{

      const data=await brokerService.getBrokerProperties(id)

      console.log(data)

      setHouses(data.houses)
      setPlots(data.plots)
    }
    catch(err){
      console.log(err.message)
    }

  }

  useEffect(()=>{
    getProperties(id)
  } , [id])
  


  const properties=broker?.propertyTypes || []
  

  return (
    <>

    <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-6 font-sans text-gray-800">
      {/* Header / Profile Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={broker.image}
          alt={broker.name}
          className="w-20 h-20 rounded-full object-cover border border-gray-200"
        />
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900">{broker.name}</h2>
            {broker.isVerified && (
              <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{broker.city}</p>
          <div className="flex items-center space-x-1 mt-1 text-sm text-amber-500 font-medium">
            <span>★</span>
            <span className="text-gray-700">{broker.rating}</span>
          </div>
        </div>
      </div>

      {/* Office Address */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
          Office Address
        </h3>
        <p className="text-sm text-gray-600">{broker.office}</p>
      </div>

      {/* Property Types List */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Specializes In
        </h3>
        <div className="flex flex-wrap gap-2">
          {properties.map((type, index) => (
            <span
              key={index}
              className="bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-md border border-gray-100"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
        onClick={()=>onChat(broker._id)}
          type="button"
          className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl text-sm hover:bg-gray-50 transition-colors"
        >
          Chat
        </button>
        <button
          type="button"
          className="flex-1 bg-gray-900 text-white font-medium py-2.5 px-4 rounded-xl text-sm hover:bg-gray-800 transition-colors"
        >
          Call
        </button>
      </div>
    </div>

      <section className="m-6">
      <h2 className="text-xl font-semibold mb-4">
        Broker Availability
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {item.day}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.date}
                </p>
              </div>

              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  item.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span>🕒</span>
              <span>
                {item.startTime} – {item.endTime}
              </span>
            </div>

            <button
           
                disabled={!item.isAvailable}
                onClick={()=>navigate("/broker-appoint", {
            state: {
              broker: broker,
              date: item?.date,
              startTime:item?.startTime,
              endTime:item?.endTime
            },
        })}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg
                hover:bg-blue-700 transition disabled:bg-gray-300
                disabled:cursor-not-allowed"
              >
                Book Appointment
            </button>
          </div>
        ))}
      </div>
    </section>

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
    </>
  );
};

export default BrokerProfile;