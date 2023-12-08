import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Trip from "./Trips";
import {
  ActiveItemProvider,
  useActiveItemContext,
} from "../context/ActiveItemContext";
import {
  TripInfoProvider,
  useTripInfoContext,
} from "../context/TripInfoContext";

const DashboardContent = () => {
  const { activeItem, handleSidebarItemClick } = useActiveItemContext();

  const { handleClearTripInfo } = useTripInfoContext();

  const renderPageContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <div>Dashboard Content</div>; // Replace with your actual dashboard content
      case "profile":
        return <Profile />;
      case "notifications":
        return <Notifications />;
      case "your trips":
        return (
          <Trip/>
        );
      default:
        return null;
    }
  };

  const capitalizeFirstLetter = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const renderPageTitle = () => {
    if (activeItem === "your trips") {
      return null; // Don't render the title for "your trips"
    } else if(activeItem === "profile") {
      return null;
    }
    return (
      <h1 className="text-2xl font-semibold">
        {capitalizeFirstLetter(activeItem)} Page
      </h1>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onSidebarItemClick={handleSidebarItemClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden pl-72">
        {/* Navbar */}
        <Navbar activeItem={activeItem} clearTripInfo={handleClearTripInfo} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 flex flex-col">
          {/* Your page content goes here */}
          {/* For example, you can add a container div and other components */}
          <div className="container mx-auto p-4">
            {renderPageTitle()}
            {renderPageContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <ActiveItemProvider>
      <TripInfoProvider>
        <DashboardContent />
      </TripInfoProvider>
    </ActiveItemProvider>
  );
};

export default Dashboard;
