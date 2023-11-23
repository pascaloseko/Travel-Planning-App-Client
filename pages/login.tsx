import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async ({ email, password }) => {
    return login(email, password);
  };

  const handleLoginSuccess = () => {
    router.push("/");
  };
  return (
    <Layout pageTitle="Login">
      <AuthForm
        title="Login"
        onSubmit={handleLogin}
        onSuccess={handleLoginSuccess}
      />
    </Layout>
  );
};

export default LoginPage;
