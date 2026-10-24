
import { useState } from "react";
import { useLocation } from "react-router";
import brokerService from "../../services/brokerService";

const Appointment = () => {


    const { state } = useLocation();

    const brokerData = state?.broker;
    const date = state?.date;

    const startTime=state?.startTime
    const endTime=state?.endTime

    console.log(state)


    console.log(brokerData);
    console.log(date);

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    const handleSubmit=async()=>{

        try{

            

            const data=await brokerService.brokerAppointment({
                broker:brokerData._id,
                startTime,
                endTime,
                appointmentDate:date
            })

            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

  


  //const slots = availability?.slots || [];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">
          Book an Appointment
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose a convenient day and time to meet your broker.
        </p>

        {/* Broker Details */}
        <div className="mt-6 flex items-center gap-4 rounded-lg bg-gray-50 p-4">
          <img
            src={brokerData?.image || "https://placehold.co/80x80?text=Broker"}
            alt="Broker"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-800">
              {brokerData?.name || "Broker Name"}
            </h3>
            <p className="text-sm text-gray-500">
              {brokerData?.city || "Location not available"}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {brokerData?.phone || "Contact not available"}
            </p>
          </div>
        </div>

        {/* Select Day */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Appointment Day
          </label>

          {date}

          
        </div>

        {/* Select Time Slot */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Available Time Slots
          </label>

          <p>{startTime} – {endTime}</p>



          
        </div>

        {/* Send Request */}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-7 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Send Appointment Request
        </button>
      </div>
    </div>
  );
};

export default Appointment;
