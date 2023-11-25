import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Notifications from "./Notifications";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  const handleSidebarItemClick = (item: string) => {
    // Update the active item in the state
    setActiveItem(item);
  };

  const capitalizeFirstLetter = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const renderPageContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <div>Dashboard Content</div>; // Replace with your actual dashboard content
      case "profile":
        return <Profile />;
      case "notifications":
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onSidebarItemClick={handleSidebarItemClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden pl-72">
        {/* Navbar */}
        <Navbar activeItem={activeItem} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 flex flex-col">
          {/* Your page content goes here */}
          {/* For example, you can add a container div and other components */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold">
              {" "}
              {capitalizeFirstLetter(activeItem)} Page
            </h1>
            {renderPageContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
