import React, { useEffect, useState } from 'react';
import brokerService from '../../services/brokerService';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import chatService from '../../services/chatService';
import { Link } from 'lucide-react';

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
    </>
  );
};

export default BrokerProfile;