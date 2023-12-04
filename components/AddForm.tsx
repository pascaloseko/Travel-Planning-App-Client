import React, { useState } from "react";
import { useTripInfoContext } from "../context/TripInfoContext";
import DateRangePicker from "./DateRangePicker";
import TimePicker from "./TimePicker";
import DatePicker from "react-datepicker";
import TimeRangePicker from "./TimeRangePicker";

const AddForm = () => {
  const { selectedTripInfo } = useTripInfoContext();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (!startDate) {
      setStartDate(date);
    } else if (date && date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

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
            Add{" "}
            {selectedTripInfo.bookingType === "flight_booking"
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
                <DateRangePicker
                  placeholderTextStart="Select Depature Date"
                  placeholderTextEnd="Select Arrival Date"
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                />
                <br />
                <TimeRangePicker
                  placeholderTextStart="Depature Time"
                  placeholderTextEnd="Arrival Time"
                  selectedStartTime={startTime}
                  selectedEndTime={endTime}
                  onChangeStartTime={setStartTime}
                  onChangeEndTime={setEndTime}
                />
              </>
            )}
            {selectedTripInfo.bookingType === "hotel_booking" && (
              <>
                {renderInputField("Hotel Name")}
                <DateRangePicker
                  placeholderTextStart="Select Check In Date"
                  placeholderTextEnd="Select Check Out Date"
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                />
                <br />
                <TimeRangePicker
                  placeholderTextStart="Depature Time"
                  placeholderTextEnd="Arrival Time"
                  selectedStartTime={startTime}
                  selectedEndTime={endTime}
                  onChangeStartTime={setStartTime}
                  onChangeEndTime={setEndTime}
                />
              </>
            )}
            {selectedTripInfo.bookingType === "itinerary" && (
              <>
                {renderInputField("Description")}
                {renderInputField("Location")}
                {renderInputField("Activity")}
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => handleDateChange(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Date"
                  className="w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  wrapperClassName="react-datepicker-wrapper-custom"
                />
              </>
            )}
            {!["flight_booking", "hotel_booking", "itinerary"].includes(
              selectedTripInfo.bookingType
            ) && (
              <>
                {renderInputField("Trip Title")}
                <DateRangePicker
                  placeholderTextStart="Select Start Date"
                  placeholderTextEnd="Select End Date"
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                />
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
