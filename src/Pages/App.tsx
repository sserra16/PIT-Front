import Routes from "../Routes/routes";
import { DarkModeProvider } from "../Hooks/dark";
import { UserProvider } from '../Hooks/user';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="918405661783-1nt8co7d988vn8grk7hmlibbdeiuqr3d.apps.googleusercontent.com">
      <UserProvider>
        <DarkModeProvider>
          <Routes />
        </DarkModeProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
