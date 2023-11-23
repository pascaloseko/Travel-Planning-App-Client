import '../styles/global.css';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../context/AuthContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    
    <CookiesProvider>
        <AuthProvider>
        <Component {...pageProps} />
        </AuthProvider>
    </CookiesProvider>
  );
}
