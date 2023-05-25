import CadastrarButton from "../../Components/Buttons/CadastrarButton.tsx";
import LoginButton from "../../Components/Buttons/LoginButton.tsx";
import SendButton from "../../Components/Buttons/SendButton.tsx";
import SocialButtons from "../../Components/Buttons/SocialButtons.tsx";
import { useRef, useState } from "react";
import { Form } from "@unform/web";
import { api } from "../../api/api.ts";
import { HiKey, HiEye, HiUser } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { Input } from "../../Components/Input/Input.tsx";
import { Tab } from "@headlessui/react";

type dataLogin = {
  email: string;
  username: string;
  senha: string;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Login = () => {
  const [loginActive, setLoginActive] = useState(true);
  const [cadasterActive, setCadasterActive] = useState(false);

  const formRef = useRef(null);

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

  const [inputType, setInputType] = useState("password");

  const Changetype = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row bg-login bg-cover">
      <div className="flex justify-center w-full lg:w-[40%] bg-white items-center h-screen">
        <div className="w-full  h-full lg:h-[70%] bg-white m-auto flex flex-col justify-center items-center ">
          <Tab.Group>
            <Tab.List className="flex gap-1 w-[70%] rounded-md items-center">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "hover:bg-gray-300 h-[33px] w-full  text-gray-700 rounded-md bg-gray-200 duration-200",
                    selected
                      ? "!bg-[#3c75cc] text-gray-200"
                      : "text-gray-700 duration-500"
                  )
                }
              >
                <p>Entrar</p>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "hover:bg-gray-300 h-[33px] w-full  text-gray-700 rounded-md bg-gray-200 duration-200",
                    selected
                      ? "!bg-[#3c75cc] text-gray-200"
                      : "text-gray-700 duration-500"
                  )
                }
              >
                <p className="text-lg">Cadastrar</p>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="rounded p-7 mmd:p-1 routedark border bordertab">
                <Form ref={formRef} onSubmit={handleSubmitLogin}>
                  <div className="w-full">
                    <div className="flex flex-col w-full my-10">
                      <Input
                        name="username"
                        type="text"
                        placeholderSel="username"
                        labelSel="Username:"
                        classSel="w-full lg: px-3 py-2 text-gray-700 bg-transparent outline-none"
                        maxLength={28}
                        iconSel={<HiUser className="text-gray-700" />}
                        htmlforSel="username"
                        //value={}
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholderSel="useremail@email.com"
                        classSel="w-full lg: px-3 py-2 text-gray-700 bg-transparent outline-none"
                        iconSel={<MdEmail className="text-gray-700" />}
                        maxLength={28}
                        labelSel="E-mail:"
                        //value={}
                      />
                      <Input
                        name="senha"
                        typeSel={inputType}
                        placeholderSel="senha"
                        labelSel="Senha:"
                        classSel="w-full transition-all px-3 py-2 text-gray-700 bg-transparent flex outline-none"
                        maxLength={28}
                        iconSel={<HiKey className="text-gray-700" />}
                        iconpassSel={
                          <button type="button" onClick={Changetype}>
                            <HiEye className="text-gray-700 " />{" "}
                          </button>
                        }
                        //value={}
                      />
                    </div>
                  </div>
                  <div className="border flex items-center w-full rounded-md">
                    <SendButton />
                  </div>
                  <div className="mt-10 h-[50px] py-10 flex items-center w-full rounded-md">
                    <SocialButtons />
                  </div>
                </Form>
              </Tab.Panel>
              <Tab.Panel className="rounded p-7 mmd:p-1 routedark border bordertab">
                <Form ref={formRef} onSubmit={handleSubmitLogin}>
                  <div className="w-full">
                    <div className="flex flex-col w-full my-10">
                      <Input
                        name="username"
                        type="text"
                        placeholderSel="username"
                        labelSel="Username:"
                        classSel="w-full lg: px-3 py-2 text-gray-700 bg-transparent outline-none"
                        maxLength={28}
                        iconSel={<HiUser className="text-gray-700" />}
                        htmlforSel="username"
                        //value={}
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholderSel="useremail@email.com"
                        classSel="w-full lg: px-3 py-2 text-gray-700 bg-transparent outline-none"
                        iconSel={<MdEmail className="text-gray-700" />}
                        maxLength={28}
                        labelSel="E-mail:"
                        //value={}
                      />
                      <Input
                        name="senhHAHAHAHAa"
                        typeSel={inputType}
                        placeholderSel="senha"
                        labelSel="SenhaHAHAHAH:"
                        classSel="w-full transition-all px-3 py-2 text-gray-700 bg-transparent flex outline-none"
                        maxLength={28}
                        iconSel={<HiKey className="text-gray-700" />}
                        iconpassSel={
                          <button type="button" onClick={Changetype}>
                            <HiEye className="text-gray-700 " />{" "}
                          </button>
                        }
                        //value={}
                      />
                    </div>
                  </div>
                  <div className="border flex items-center w-full rounded-md">
                    <SendButton />
                  </div>
                  <div className="mt-10 h-[50px] py-10 flex items-center w-full rounded-md">
                    <SocialButtons />
                  </div>
                </Form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
  );
};

export default Login;
