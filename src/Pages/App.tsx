import Routes from "../Routes/routes";
import { DarkModeProvider } from "../Hooks/dark";

function App() {
  return (
    <DarkModeProvider>
      <Routes />
    </DarkModeProvider>
  );
}

export default App;
