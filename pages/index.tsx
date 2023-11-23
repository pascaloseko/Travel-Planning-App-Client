import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import LoginPage from './login';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Fetch additional user data or perform actions when the component mounts
    if (user) {
      console.log('User credentials:', user);
    }
  }, [user]);
  return (
    <Layout pageTitle="Home">
      {user?.username ? (
        <>
          <h2>Welcome, {user.username}!</h2>
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </Layout>
  );
};

export default HomePage;
