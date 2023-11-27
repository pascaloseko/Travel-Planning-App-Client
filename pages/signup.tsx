import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { useRouter } from "next/router";

const SignupPage = () => {
  const router = useRouter();
  const { signUp, loading } = useAuth();

  const handleSignup = async ({ username, email, password }) => {
    return signUp(username, email, password);
  };

  const handleSignupSuccess = () => {
    router.push("/login");
  };

  return (
    <Layout pageTitle="Signup">
      {loading ? ( // Conditional rendering of loading spinner
        <div>Loading...</div>
      ) : (
        <AuthForm
          title="Signup"
          onSubmit={handleSignup}
          onSuccess={handleSignupSuccess}
        />
      )}
    </Layout>
  );
};

export default SignupPage;
