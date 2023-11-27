import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useAuth } from "../context/AuthContext";
import { DEV_SERVER_URL } from "../config";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tripData, setTripData] = useState([]);
  const { user } = useAuth();

  const tripColumns = [
    { key: "title", header: "Title" },
    { key: "start_date", header: "Start Date" },
    { key: "end_date", header: "End Date" },
    { key: "itinerary", header: "Itinerary" },
    { key: "hotel_booking", header: "Hotel Booking" },
    { key: "flight_booking", header: "Flight Booking" },
  ];

  const tabs = [
    {
      label: "Trips",
      content: (
        <Table
          data={tripData}
          columns={tripColumns}
          loading={!tripData.length}
        />
      ),
    },
  ];

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
