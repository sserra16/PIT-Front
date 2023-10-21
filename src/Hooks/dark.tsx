import React, { createContext, useContext, useEffect, useState } from "react";

type darkData = {
  isDark: boolean;
  setDark: () => void;
  setLight: () => void;
};

type Props = {
  children: React.ReactNode;
};

const darkModeContext = createContext<darkData>({} as darkData);

const DarkModeProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("dark") != "true";
  });

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  });

  const setDark = () => {
    localStorage.setItem("dark", "true");
    document.documentElement.classList.add("dark");
    setIsDark(false);
  };

  const setLight = () => {
    localStorage.setItem("dark", "false");
    document.documentElement.classList.remove("dark");
    setIsDark(true);
  };

  return (
    <darkModeContext.Provider value={{ isDark, setDark, setLight }}>
      {children}
    </darkModeContext.Provider>
  );
};

function useDark(): darkData {
  const context = useContext(darkModeContext);

  if (!context) {
    throw new Error("useDark deve ser usado dentro de um provider válido");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDark };
