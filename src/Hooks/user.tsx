import React, { createContext, useContext, useState } from "react";
import { User } from "../types/user";

type userData = {
  usuario: User;
  setUsuario: (user: userData["usuario"]) => void;
  image: string;
  setImage: (path: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const userContext = createContext<userData>({} as userData);

const UserProvider: React.FC<Props> = ({ children }) => {
  const [usuario, setUser] = useState<userData["usuario"]>({});
  const [avatar, setAvatar] = useState<string>("");

  const setUsuario = (user: userData["usuario"]) => {
    setUser(user);
  };

  const setImage = (path: string) => {
    setAvatar(path)
  }

  return (
    <userContext.Provider value={{ usuario, setUsuario, image: avatar, setImage }}>
      {children}
    </userContext.Provider>
  );
};

function useUser(): userData {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um provider válido");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };
