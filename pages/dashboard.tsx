import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const DashboardPage = () => {
  return (
    <Layout pageTitle="Dashboard">
      <ToastContainer position="bottom-right" />
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
