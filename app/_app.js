import "@/styles/globals.css";
import { UserProvider } from "./context/UserContext";
import { BarProvider } from "./context/BarContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <BarProvider>
          <Component {...pageProps} />
        </BarProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
