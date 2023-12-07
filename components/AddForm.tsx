import React, { useState, ChangeEvent } from "react";
import { useTripInfoContext } from "../context/TripInfoContext";
import DateRangePicker from "./DateRangePicker";
import DatePicker from "react-datepicker";
import TimeRangePicker from "./TimeRangePicker";
import { DEV_SERVER_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import moment from "moment-timezone";

interface InputValues {
  airline?: string;
  flight_number?: string;
  hotel_name?: string;
}

const AddForm = () => {
  const { selectedTripInfo } = useTripInfoContext();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [inputValues, setInputValues] = useState<InputValues>({});
  const { user } = useAuth();

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

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    setInputValues((prevValues: InputValues) => ({
      ...prevValues,
      [inputType]: event.target.value,
    }));
  };

  // save form data
  const saveFormData = async (apiEndPoint: string, requestBody: any) => {
    try {
      const response = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  // handles save form data
  const handleSave = () => {
    let apiEndPoint, requestBody;

    switch (selectedTripInfo.bookingType) {
      case "flight_booking":
        apiEndPoint = `${DEV_SERVER_URL}/api/v1/protected/${selectedTripInfo.tripID}/flight-bookings`;
        requestBody = {
          airline: inputValues.airline,
          flight_number: inputValues.flight_number,
          departure_date: combineDateTime(startDate, startTime),
          arrival_date: combineDateTime(endDate, endTime),
        };
        break;
      case "hotel_booking":
        apiEndPoint = `${DEV_SERVER_URL}/api/v1/protected/${selectedTripInfo.tripID}/hotel-bookings`;
        requestBody = {
          hotel_name: inputValues.hotel_name,
          check_in_date: combineDateTime(startDate, startTime),
          check_out_date: combineDateTime(endDate, endTime),
        };
        break;
      case "itinerary":
        apiEndPoint = `${DEV_SERVER_URL}/api/v1/protected/${selectedTripInfo.tripID}/itinerary`;
        requestBody = {
          ...inputValues, // Use the input values dynamically
          date: startDate.toISOString().split("T")[0],
        };
        break;
      default:
        apiEndPoint = `${DEV_SERVER_URL}/api/v1/protected/trips`;
        requestBody = {
          ...inputValues, // Use the input values dynamically
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        };
        break;
    }

    const requiredFieldsFilled =
      Object.values(inputValues).every(Boolean) &&
      startDate !== null ||
      endDate !== null;

    if (!requiredFieldsFilled) {
      console.log("Please fill in all required fields.");
      return;
    }

    console.log("clicked!")

    saveFormData(apiEndPoint, requestBody);
  };

  const combineDateTime = (date: Date, time: Date | null): string => {
    if (!time) {
      // If time is not provided, return the date in local ISO string format
      return moment(date).format("YYYY-MM-DDTHH:mm:ss");
    }

    // Combine date and time components
    const combinedDateTime = moment(date)
      .set("hour", time.getHours())
      .set("minute", time.getMinutes());

    // Format the combined date and time to the desired format in local time
    const formattedDateTime = combinedDateTime.format("YYYY-MM-DDTHH:mm:ss");

    return formattedDateTime;
  };

  const renderInputFields = () => {
    switch (selectedTripInfo.bookingType) {
      case "flight_booking":
        return (
          <>
            <input
              type="text"
              placeholder="Airline"
              className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              onChange={(event) => handleInputChange(event, "airline")}
              required
            />
            <input
              type="text"
              placeholder="Flight Number"
              className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              onChange={(event) => handleInputChange(event, "flight_number")}
              required
            />
            <DateRangePicker
              placeholderTextStart="Select Start Date"
              placeholderTextEnd="Select End Date"
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
            />
            <br />
            <TimeRangePicker
              placeholderTextStart="Departure Time"
              placeholderTextEnd="Arrival Time"
              selectedStartTime={startTime}
              selectedEndTime={endTime}
              onChangeStartTime={setStartTime}
              onChangeEndTime={setEndTime}
            />
          </>
        );

      case "hotel_booking":
        return (
          <>
            <input
              type="text"
              placeholder="Hotel Name"
              className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              onChange={(event) => handleInputChange(event, "hotel_name")}
            />
            <DateRangePicker
              placeholderTextStart="Select Check In Date"
              placeholderTextEnd="Select Check Out Date"
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
            />
            <br />
            <TimeRangePicker
              placeholderTextStart="CheckIn Time"
              placeholderTextEnd="CheckOut Time"
              selectedStartTime={startTime}
              selectedEndTime={endTime}
              onChangeStartTime={setStartTime}
              onChangeEndTime={setEndTime}
            />
          </>
        );

      case "itinerary":
        return (
          <>
            <input
              type="text"
              placeholder="Description"
              className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              onChange={(event) => handleInputChange(event, "description")}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              onChange={(event) => handleInputChange(event, "location")}
              required
            />
            <input
              type="text"
              placeholder="Activity"
              className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              onChange={(event) => handleInputChange(event, "activity")}
              required
            />
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => handleDateChange(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select Date"
              className="w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              wrapperClassName="react-datepicker-wrapper-custom"
              required
            />
          </>
        );

      default:
        return (
          <>
            <input
              type="text"
              placeholder="Trip Title"
              className="mb-5 w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
              onChange={(event) => handleInputChange(event, "title")}
              required
            />
            <DateRangePicker
              placeholderTextStart="Select Start Date"
              placeholderTextEnd="Select End Date"
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-100">
      <br />
      <br />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-xl font-semibold mb-4">
            Add{" "}
            {selectedTripInfo.bookingType === "itinerary"
              ? "Itinerary"
              : selectedTripInfo.bookingType === "flight_booking"
              ? "Flight Booking"
              : selectedTripInfo.bookingType === "hotel_booking"
              ? "Hotel Booking"
              : "Trip"}
          </h1>
          <div className="mb-4">{renderInputFields()}</div>
          {/* {(!Object.values(inputValues).every(Boolean) ||
            startDate === null ||
            endDate === null) && (
            <p className="text-red-500 text-sm mb-2">
              Please fill in all required fields.
            </p>
          )} */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            // disabled={
            //   !Object.values(inputValues).every(Boolean) ||
            //   startDate === null ||
            //   endDate === null
            // }
          >
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
