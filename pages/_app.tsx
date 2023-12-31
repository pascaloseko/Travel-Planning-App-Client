import "../styles/global.css";
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
