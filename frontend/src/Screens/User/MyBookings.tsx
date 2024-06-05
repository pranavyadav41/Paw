import React, { useEffect, useState } from 'react';
import { getBookings } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MyBookings = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState<any>([]);

  useEffect(() => {
    if (userInfo) {
      getBookings(userInfo._id)
        .then((response) => setBookings(response?.data))
        .catch((error) => console.error('Error fetching bookings:', error));
    }
  }, [userInfo]);

  const handleViewDetails = (bookingId: string) => {
    // Handle view details logic here
  };

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 ml-1">My Bookings</h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 border">Booking Date</th>
              <th className="py-3 px-6 border">Slot</th>
              <th className="py-3 px-6 border">Name</th>
              <th className="py-3 px-6 border">Phone</th>
              <th className="py-3 px-6 border">Service ID</th>
              <th className="py-3 px-6 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any) => (
              <tr key={booking._id} className="odd:bg-gray-100 even:bg-white">
                <td className="py-3 px-6 border">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className="py-3 px-6 border">{booking.startTime} - {booking.endTime}</td>
                <td className="py-3 px-6 border">{booking.name}</td>
                <td className="py-3 px-6 border">{booking.phone}</td>
                <td className="py-3 px-6 border">{booking.serviceId}</td>
                <td className="py-3 px-6 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => handleViewDetails(booking._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;