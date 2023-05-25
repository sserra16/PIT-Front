import CadastrarButton from "./Buttons/CadastrarButton.tsx";
import LoginButton from "./Buttons/LoginButton.tsx";
import Inputs from "./Inputs.tsx";
import SendButton from "./Buttons/SendButton.tsx";
import SocialButtons from "./Buttons/SocialButtons.tsx";
import { useEffect, useRef, useState } from "react";
import { HiMoon } from "react-icons/hi";
import { Form } from "@unform/web";
import { api } from "../api/api.ts";

type dataLogin = {
  email: string;
  username: string;
  senha: string;
};

const Login = () => {
  const [loginActive, setLoginActive] = useState(true);
  const [cadasterActive, setCadasterActive] = useState(false);
  const [dark, setDark] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (dark == true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleSubmitLogin = async (data: dataLogin) => {
    await api
      .post("/cadastro", {
        username: data.username,
        email: data.email,
        password: data.senha,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full flex flex-col sm:flex-row bg-login bg-cover">
      <div className="flex justify-center w-full lg:w-[40%] bg-white items-center h-screen">
        <div className="w-full xl:!px-48 !px-12 h-full lg:h-[70%] dark:bg-[#5e5e5e] bg-white m-auto flex flex-col justify-center items-center ">
          <div className="text-[#0e0e0e] dark:text-white">
            {" "}
            <HiMoon
              onClick={() => {
                setDark(!dark);
              }}
            />
          </div>
          <div className="bg-gray-200 shadow-sm flex items-center rounded-md py-1 justify-center">
            <LoginButton
              active={loginActive}
              onClick={() => {
                setLoginActive(true);
                setCadasterActive(false);
              }}
            />
            <CadastrarButton
              active={cadasterActive}
              onClick={() => {
                setLoginActive(false);
                setCadasterActive(true);
              }}
            />
          </div>
          <Form ref={formRef} onSubmit={handleSubmitLogin}>
            <div className="w-full">
              <Inputs />
            </div>
            <div className="border flex items-center w-full rounded-md">
              <SendButton />
            </div>
            <div className="mt-10 h-[50px] py-10 flex items-center w-full rounded-md">
              <SocialButtons />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
