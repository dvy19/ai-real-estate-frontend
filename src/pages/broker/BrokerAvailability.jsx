import { useState } from "react";
import axios from "axios";
import brokerService from "../../services/brokerService";

function BrokerAvailability() {
  const [schedule, setSchedule] = useState([]);

  const [form, setForm] = useState({
    date: "",
    day: "Monday",
    startTime: "10:00",
    endTime: "12:00",
    isAvailable: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const addSchedule = () => {
    if (!form.day || !form.startTime || !form.endTime) {
      alert("Please fill the required fields");
      return;
    }

    if (form.startTime >= form.endTime) {
      alert("End time must be after start time");
      return;
    }

    setSchedule([...schedule, { ...form }]);
  };

  const removeSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const saveSchedule = async () => {
    try {
     

      const data=await brokerService.brokerAvailable(schedule)

      console.log(data)

      alert("Schedule saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save schedule");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Broker Availability</h2>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <select
        name="day"
        value={form.day}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        {[
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday"
        ].map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>

      <div className="flex gap-3">
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="isAvailable"
          checked={form.isAvailable}
          onChange={handleChange}
        />
        Available
      </label>

      <button
        type="button"
        onClick={addSchedule}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Schedule
      </button>

      <div className="space-y-2">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {item.date || item.day}
              </p>
              <p className="text-sm text-gray-600">
                {item.startTime} – {item.endTime}
              </p>
              <p className="text-sm">
                {item.isAvailable ? "Available" : "Unavailable"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeSchedule(index)}
              className="text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={saveSchedule}
        disabled={schedule.length === 0}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Save Schedule
      </button>
    </div>
  );
}

export default BrokerAvailability;