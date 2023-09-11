import Routes from "../Routes/routes";
import { DarkModeProvider } from "../Hooks/dark";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="918405661783-1nt8co7d988vn8grk7hmlibbdeiuqr3d.apps.googleusercontent.com">
      <DarkModeProvider>
        <Routes />
      </DarkModeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
