import SocialButtons from "../../Components/Buttons/SocialButtons.tsx";
import { useRef, useState, useEffect } from "react";
import { Form } from "@unform/web";
import { api } from "../../api/api.ts";
import { HiKey, HiEye, HiUser } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { Input } from "../../Components/Input/Input.tsx";
import { Tab } from "@headlessui/react";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";

type dataLogin = {
  email: string;
  username: string;
  senha: string;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Login = () => {
  const CadastroFormRef = useRef(null);
  const LoginFormRef = useRef(null);

  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark == true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleSubmitCadastro = async (data: dataLogin) => {
    await api
      .post("/cadastro", {
        username: data.username,
        email: data.email,
        password: data.senha,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  const handleSubmitLogin = async (data: dataLogin) => {
    await api
      .post("/login", {
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
      <div className="flex justify-center w-full lg:w-[40%] dark:bg-[#2b2b2b] bg-white items-center h-screen duration-300">
        <div className="text-gray-700 dark:text-white text-[130%] h-full justify-start ml-[1rem] mt-[2rem] flex ">
          {dark ? (
            <FiSun
              onClick={() => {
                setDark(false);
              }}
            />
          ) : (
            <HiOutlineMoon
              onClick={() => {
                setDark(true);
              }}
            />
          )}
        </div>
        <div className="w-full  h-full lg:h-[70%] pl-12 pr-16 duration-300 dark:bg-[#2b2b2b] bg-white flex flex-col justify-center items-center">
          <Tab.Group>
            <Tab.List className="flex gap-1 w-full bg-gray-200 dark:bg-gray-700 p-1 shadow-sm rounded-md items-center">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "hover:bg-gray-300 h-[33px] w-full !outline-none text-gray-700 rounded-md bg-gray-200 duration-200",
                    selected
                      ? "!bg-[#3c75cc] text-white"
                      : "text-gray-700 duration-500"
                  )
                }
              >
                <p>Cadastrar</p>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "hover:bg-gray-300 h-[33px] !outline-none w-full text-gray-700 rounded-md bg-gray-200 duration-200",
                    selected
                      ? "!bg-[#3c75cc] text-white"
                      : "text-gray-700 duration-500"
                  )
                }
              >
                <p className="text-lg">Logar</p>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="rounded p-7 mmd:p-1 w-full routedark">
                <Form ref={CadastroFormRef} onSubmit={handleSubmitCadastro}>
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
                    <button
                      type="submit"
                      className="bg-[#3c75cc] h-[40px] lg:w-[100%] w-[100%] mx-auto px-4 text-white  rounded-md hover:bg-[#284eb6] duration-200 "
                    >
                      Cadastrar
                    </button>
                  </div>
                  <div className="mt-10 h-[50px] py-10 flex items-center w-full rounded-md">
                    <SocialButtons />
                  </div>
                </Form>
              </Tab.Panel>
              <Tab.Panel className="rounded p-7 mmd:p-1 routedark">
                <Form ref={LoginFormRef} onSubmit={handleSubmitLogin}>
                  <div className="w-full">
                    <div className="flex flex-col w-full my-10">
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
                    <button
                      type="submit"
                      className="bg-[#3c75cc] h-[40px] lg:w-[100%] w-[100%] mx-auto px-4 text-white  rounded-md hover:bg-[#284eb6] duration-200 "
                    >
                      Entrar
                    </button>
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
