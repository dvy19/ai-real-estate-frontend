import {React  , useEffect, useState}from 'react'
import { useNavigate  } from 'react-router'
import brokerService from '../../services/brokerService';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const BrokerHome = () => {

    

    const navigate=useNavigate()

    const[brokerId , setBrokerId]=useState();
    const[notifications, setNotifications] = useState([]);


    const getBrokerAppoint=async()=>{

      try{

        const data=await brokerService.getSelfBrokerAppointment()

        console.log(data.appointments)

        setNotifications(data.appointments);
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
        getBrokerAppoint();
    }, []);

    const getBroker=async()=>{

      try{

        const broker=await brokerService.getSelfProfile()

        console.log(broker.broker._id)

        setBrokerId(broker.broker._id)

      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
        //console.log("Connecting socket:", socket.id);
        //console.log("Joining broker room:", brokerId);

        socket.emit("join_broker", brokerId);
        socket.on("new_appointment", (data) => {
          //console.log("✅ SOCKET NOTIFICATION RECEIVED:", data);
          alert(data.message);

          setNotifications((prev) => [
            data.appointment,
            ...prev,
          ]);
        });

        return () => {
          socket.off("new_appointment");
        };
      }, [brokerId]);

    useEffect(()=>{
      getBroker()
    },[])
  return (
    <div>
      <button onClick={()=>navigate('/add-plot')}>add Plot</button>

      <br /><br /><br /><br />

      <button onClick={()=>navigate('/broker-available')}>Add schedule</button>

      <div className="mb-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Appointment Notifications
  </h2>

  {notifications.length === 0 ? (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
      <p className="text-gray-500">
        No new appointment requests.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {notifications.map((notification) => {
        const appointment = notification.appointment;

        return (
          <div
            key={notification.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <span className="text-xl">📅</span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    New Appointment Request
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {notification.message}
                  </p>
                </div>
              </div>

              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                New
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500">Appointment Date</p>
                <p className="font-medium text-gray-800 mt-1">
                  {appointment?.appointmentDate
                    ? new Date(appointment.appointmentDate).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500">Time Slot</p>
                <p className="font-medium text-gray-800 mt-1">
                  {appointment?.startTime} - {appointment?.endTime}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-amber-600 mt-1">
                  {appointment?.status || "Pending"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  navigate("/broker-appointments")
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                View Appointments
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

    </div>
  )
}

export default BrokerHome
