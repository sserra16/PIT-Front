import CadastrarButton from "./Buttons/CadastrarButton.tsx";
import LoginButton from "./Buttons/LoginButton.tsx";
import Inputs from "./Inputs.tsx";
import SendButton from "./Buttons/SendButton.tsx";
import SocialButtons from "./Buttons/SocialButtons.tsx";
import { useState } from "react";

const Login = () => {
  const [loginActive, setLoginActive] = useState(true);
  const [cadasterActive, setCadasterActive] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row bg-login bg-cover">
        <div className="flex justify-center w-full lg:w-[40%] bg-white items-center h-screen">
          <div className="w-full xl:!px-48 !px-12 h-full lg:h-[70%] bg-white m-auto flex flex-col justify-center items-center ">
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
            <div className="w-full">
              <Inputs />
            </div>
            <div className="border flex items-center w-full rounded-md">
              <SendButton />
            </div>
            <div className="mt-10 h-[50px] py-10 flex items-center w-full rounded-md">
              <SocialButtons />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center w-full lg:w-[50%] bg-[#494949] items-center h-screen">
          <div className="w-full lg:w-[70%] h-full lg:h-[70%] bg-white p-4 m-auto flex flex-col justify-center items-center ">
            <div className="w-[45%] lg:w-70% h-[30px] bg-[#e2e2e2] flex items-center rounded-md justify-center">
              <LoginButton />
              <CadastrarButton />
            </div>
            <div className="w-full lg:w-[45%]">
              <Inputs />
            </div>
            <div className="w-full lg:w-[45%] h-[50px] flex items-center  rounded-md">
              <SendButton />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Login;
