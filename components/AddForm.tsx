import React from "react";

interface AddFormProps {
    selectedTripInfo: {
        tripID: null,
        bookingType: null,
      }
}

const AddForm: React.FC<AddFormProps> = ({ selectedTripInfo }) => {
    return (
      <div className="bg-gray-100">
        <br />
        <br />
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-xl font-semibold mb-4">
              Add{' '}
              {selectedTripInfo.bookingType === 'flight_booking'
                ? 'Flight Booking'
                : selectedTripInfo.bookingType === 'hotel_booking'
                ? 'Hotel Booking'
                : selectedTripInfo.bookingType === 'itinerary'
                ? 'Itinerary'
                : 'Trip'}{' '}
            </h1>
            <div className="mb-4">
              <input
                type="email"
                placeholder="you@example.com"
                className="mb-5 email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="mb-5 email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="mb-5 email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              />
            </div>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
              Save
            </button>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  };
  
  export default AddForm;