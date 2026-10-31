import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/authService';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  

  const fetchAppointments = async () => {
    try {
      // Replace with your actual endpoint URL and auth headers
      const res = await authService.getMyAppointments()

      setAppointments(res.myAppointment || []);

      console.log(res.myAppointment)
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.message || 'Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const statusOptions = ['all', 'pending', 'accepted', 'rejected', 'cancelled'];

  const filteredAppointments = selectedStatus === 'all'
    ? appointments
    : appointments.filter((item) => item.status === selectedStatus);

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      accepted: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
      cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return (
      <span className={`px-2.5 py-1 text-xs font-medium border rounded-full capitalize ${styles[status] || styles.cancelled}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-500 text-sm">
        Loading appointments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">My Appointments</h1>
          <p className="text-sm text-gray-500">
            {filteredAppointments.length} {filteredAppointments.length === 1 ? 'request' : 'requests'} found
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                selectedStatus === status
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500">No appointments found for this status.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAppointments.map((appt) => {
            const formattedDate = new Date(appt.appointmentDate).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            return (
              <div
                key={appt._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors gap-4"
              >
                {/* Left Section: Broker Info & Time */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-base">
                      {appt.broker?.name || appt.broker?.email || 'Broker'}
                    </span>
                    {getStatusBadge(appt.status)}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>📅 {formattedDate}</span>
                    <span>•</span>
                    <span>⏰ {appt.startTime} - {appt.endTime}</span>
                  </div>
                </div>

                {/* Right Section: Request Meta */}
                <div className="text-xs text-gray-400 sm:text-right">
                  Requested on {new Date(appt.createdAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;