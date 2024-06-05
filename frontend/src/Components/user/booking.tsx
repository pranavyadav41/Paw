import React from 'react';

interface BookingListItemProps {
  booking: any; // Replace 'any' with the appropriate type for your booking object
  onViewDetailsClick: (booking: any) => void; // Function to handle "View Details" click
}

const BookingListItem: React.FC<BookingListItemProps> = ({ booking, onViewDetailsClick }) => {
  const { bookingDate, startTime, endTime, name, phone, serviceId } = booking;

  const handleViewDetailsClick = () => {
    onViewDetailsClick(booking);
  };

  return (
    <div>
      <div>Booking Date: {new Date(bookingDate).toLocaleString()}</div>
      <div>Slot: {startTime} - {endTime}</div>
      <div>Name: {name}</div>
      <div>Phone: {phone}</div>
      <div>Service ID: {serviceId}</div>
      <button onClick={handleViewDetailsClick}>View Details</button>
    </div>
  );
};

export default BookingListItem;