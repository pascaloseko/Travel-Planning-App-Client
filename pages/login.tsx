import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import Loader from "../components/Loader";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password);
      // Clear any previous login errors on success
      setLoginError(null);
    } catch (error) {
      setLoginError("Invalid email or password. Please try again."); // Set an error message
      throw error; // Re-throw the error to propagate it to AuthForm
    }
  };

  const handleLoginSuccess = () => {
    router.push("/");
  };

  return (
    <Layout pageTitle="Login">
      {loading && loginError === null ? (
        <Loader />
      ) : (
        <AuthForm
          title="Login"
          onSubmit={handleLogin}
          onSuccess={handleLoginSuccess}
          loginError={loginError}
        />
      )}
    </Layout>
  );
};

export default LoginPage;
