import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useAuth } from "../context/AuthContext";
import { DEV_SERVER_URL } from "../config";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tripData, setTripData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [selectedTripInfo, setSelectedTripInfo] = useState({
    tripID: null,
    bookingType: null,
  });
  const { user } = useAuth();

  const columns = {
    trip: [
      { key: "title", header: "Title" },
      { key: "start_date", header: "Start Date" },
      { key: "end_date", header: "End Date" },
      { key: "itinerary", header: "Itinerary" },
      { key: "hotel_booking", header: "Hotel Booking" },
      { key: "flight_booking", header: "Flight Booking" },
    ],
    itinerary: [
      { key: "date", header: "Date" },
      { key: "description", header: "Description" },
      { key: "location", header: "Location" },
      { key: "activity", header: "Activity" },
    ],
    hotel_booking: [
      { key: "hotel_name", header: "Hotel Name" },
      { key: "check_in_date", header: "Check In Time" },
      { key: "check_out_date", header: "Check Out Time" },
    ],
    flight_booking: [
      { key: "airline", header: "Airline" },
      { key: "flight_number", header: "Flight Number" },
      { key: "departure_date", header: "Date Of Departure" },
      { key: "arrival_date", header: "Arrival Date" },
    ],
  };

  const handleBookingClick = (tripId, bookingType) => {
    setSelectedTripInfo({ tripID: tripId, bookingType: bookingType });
    fetchBookingData(tripId, bookingType);
  };

  const tabs = selectedTripInfo.bookingType
    ? [
        {
          label:
            selectedTripInfo.bookingType === "itinerary"
              ? "Itinerary"
              : selectedTripInfo.bookingType === "hotel_booking"
              ? "Hotel Booking"
              : selectedTripInfo.bookingType === "flight_booking"
              ? "Flight Booking"
              : "Trips",
          content: (
            <Table
              data={bookingData}
              columns={columns[selectedTripInfo.bookingType]}
              loading={!bookingData.length}
            />
          ),
        },
      ]
    : [
        {
          label: "Trips",
          content: (
            <Table
              data={tripData}
              columns={columns.trip}
              loading={!tripData.length}
              onIconClick={handleBookingClick}
            />
          ),
        },
      ];

  const fetchBookingData = async (tripId, bookingType) => {
    try {
      let response;

      if (bookingType === "itinerary") {
        response = await fetch(
          `${DEV_SERVER_URL}/api/v1/protected/${tripId}/itinerary`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      } else if (bookingType === "flight_booking" || bookingType === "hotel_booking") {
        // Handle flight_booking and hotel_booking differently
        const formattedBookingType = String(bookingType).replace(/_booking/g, "");
        response = await fetch(
          `${DEV_SERVER_URL}/api/v1/protected/${tripId}/${formattedBookingType}-bookings`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      }

      if (!response.ok) {
        setSelectedTripInfo({ tripID: null, bookingType: null });
        throw new Error("Failed to fetch data");
      }

      const { data } = await response.json();
      setBookingData(data);

      // Set selectedTripInfo to null if booking data is empty
    if (!data || data.length === 0) {
      setSelectedTripInfo({ tripID: null, bookingType: null });
    }
    } catch (error) {
      console.error("Fetch error:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await fetch(
          `${DEV_SERVER_URL}/api/v1/protected/trips`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        setTripData(data);
      } catch (error) {
        console.error("Fetch error:", error);
        // Handle error as needed
      }
    };

    // Fetch data when the component mounts or when the active tab changes
    fetchTripData();
  }, [activeTab, user?.token]);

  return (
    <div className="bg-white">
      <nav className="flex flex-col sm:flex-row">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              activeTab === index
                ? "text-blue-500 border-b-2 font-medium border-blue-500"
                : "text-gray-600"
            } flex-1 py-4 px-6 block hover:text-blue-500 focus:outline-none`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
