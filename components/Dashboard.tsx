import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden pl-72">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 flex flex-col">
          {/* Your page content goes here */}
          {/* For example, you can add a container div and other components */}
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold">Dashboard Page</h1>
            {/* Add more content as needed */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;