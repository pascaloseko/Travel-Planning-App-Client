import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const types = ["success", "info", "warning", "error"];

const DashboardPage = () => {
  const addNotification = () => {
    // use a random type of notification
    toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[Math.floor(Math.random() * types.length)] as TypeOptions
    });
  };
  return (
    <Layout pageTitle="Dashboard">
      <ToastContainer position="bottom-right" />
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;