import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { login, loading } = useAuth();

  const handleLogin = async ({ email, password }) => {
    return login(email, password);
  };

  const handleLoginSuccess = () => {
    router.push("/");
  };
  return (
    <Layout pageTitle="Login">
      {loading ? ( // Conditional rendering of loading spinner
        <div>Loading...</div>
      ) : (
        <AuthForm
          title="Login"
          onSubmit={handleLogin}
          onSuccess={handleLoginSuccess}
        />
      )}
    </Layout>
  );
};

export default LoginPage;
