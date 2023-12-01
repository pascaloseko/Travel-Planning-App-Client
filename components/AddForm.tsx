import React, { useState } from "react";
import { useTripInfoContext } from "../context/TripInfoContext";
import DateRangePicker from "./DateRangePicker";
import TimePicker from "./TimePicker";

const AddForm = () => {
  const { selectedTripInfo } = useTripInfoContext();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const renderInputField = (placeholder) => (
    <input
      type="text"
      placeholder={placeholder}
      className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
    />
  );

  return (
    <div className="bg-gray-100">
      <br />
      <br />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-xl font-semibold mb-4">
            Add {selectedTripInfo.bookingType === "flight_booking"
              ? "Flight Booking"
              : selectedTripInfo.bookingType === "hotel_booking"
                ? "Hotel Booking"
                : selectedTripInfo.bookingType === "itinerary"
                  ? "Itinerary"
                  : "Trip"}
          </h1>
          <div className="mb-4">
            {selectedTripInfo.bookingType === "flight_booking" && (
              <>
                {renderInputField("Airline")}
                {renderInputField("Flight Number")}
                <DateRangePicker />
              </>
            )}
            {selectedTripInfo.bookingType === "hotel_booking" && (
              <>
                {renderInputField("Hotel Name")}
                <DateRangePicker />
              </>
            )}
            {selectedTripInfo.bookingType === "itinerary" && (
              <>
                {renderInputField("Description")}
                {renderInputField("Location")}
                {renderInputField("Activity")}
                <DateRangePicker />
              </>
            )}
            {!["flight_booking", "hotel_booking", "itinerary"].includes(selectedTripInfo.bookingType) && (
              <>
                {renderInputField("Trip Title")}
                <DateRangePicker />
                {/* <br /> */}
                {/* <TimePicker label="Start Time" selectedTime={startTime} onChange={setStartTime} />
                <TimePicker label="End Time" selectedTime={endTime} onChange={setEndTime} /> */}
              </>
            )}
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
