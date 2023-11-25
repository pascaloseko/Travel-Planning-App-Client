import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LoginPage from './login';
import DashboardPage from './dashboard'
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch additional user data or perform actions when the component mounts
    if (user) {
      console.log('User credentials:', user);
    }
    setLoading(false); // Set loading to false after user data is processed
  }, [user]);

  if (loading) {
    // Render loading state or a placeholder while authentication is being determined
    return <div>Loading...</div>;
  }

  return (
    <Layout pageTitle="Home">
      {isAuthenticated ? (
        <DashboardPage />
      ) : (
        <LoginPage />
      )}
    </Layout>
  );
};

export default HomePage;
