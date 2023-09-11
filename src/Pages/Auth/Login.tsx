import React, { useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { api } from "../../api/api.ts";
import { HiKey, HiEye, HiUser } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { Input } from "../../Components/Input.tsx";
import { Dialog, Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AlertType } from "../../types/index.ts";
import { CircularProgress } from "@mui/material";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import axios from "axios";

type dataLogin = {
  email: string;
  username: string;
  senha: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Login = () => {
  const CadastroFormRef = useRef<FormHandles>(null);
  const LoginFormRef = useRef<FormHandles>(null);
  const [alert, setAlert] = useState<AlertType>();
  const [inputType, setInputType] = useState("password");
  const [isOpen, setIsOpen] = useState(false);

  const history = useNavigate();

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmitCadastro = async (data: dataLogin) => {
    if (data.username === "") {
      CadastroFormRef.current?.setFieldError(
        "username",
        "O username é obrigatório"
      );
      return;
    } else if (data.email === "") {
      CadastroFormRef.current?.setFieldError("email", "O email é obrigatório");
      return;
    } else if (data.senha === "") {
      CadastroFormRef.current?.setFieldError("senha", "A senha é obrigatória");
      return;
    }

    await api
      .post("/cadastro", {
        username: data.username,
        email: data.email,
        password: data.senha,
      })
      .then((res) => {
        setAlert({
          description: "Usuário cadastrado!",
          open: true,
          type: "success",
        });
        console.log(res);
      })
      .catch((error) => {
        setAlert({
          open: true,
          description: error.response.data.message,
          type: "error",
        });
      });
  };

  const handleGoogleLogin = async (response: TokenResponse) => {
    const user = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `${response.token_type} ${response.access_token}`,
        },
      }
    );

    await api
      .post("/cadastro", {
        username: user.data.name,
        email: user.data.email,
        password: "",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleLogin,
  });

  const handleSubmitLogin = async (data: dataLogin) => {
    if (data.email === "") {
      LoginFormRef.current?.setFieldError("email", "O email é obrigatório");
      return;
    } else if (data.senha === "") {
      LoginFormRef.current?.setFieldError("senha", "A senha é obrigatória");
      return;
    }

    await api
      .post("/login", {
        email: data.email,
        password: data.senha,
      })
      .then(() => {
        setAlert({
          description: "Usuário logado!",
          open: true,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          open: true,
          description: error.response.data.msg,
          type: "error",
        });
      });
  };

  const Changetype = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded flex items-center p-10 justify-center bg-white">
            <CircularProgress />
          </Dialog.Panel>
        </div>
      </Dialog>

      <Tab.Group>
        <Tab.List className="flex gap-1 w-full bg-gray-200 dark:bg-gray-700 p-1 shadow-sm rounded-md items-center duration-300">
          <Tab
            className={({ selected }) =>
              classNames(
                "hover:bg-gray-300 dark:hover:bg-gray-800 h-[33px] w-full !outline-none text-gray-700 rounded-md dark:text-white duration-200",
                selected
                  ? "!bg-[#3c75cc] text-white"
                  : "text-gray-700 duration-500"
              )
            }>
            <p>Cadastrar</p>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "hover:bg-gray-300 dark:hover:bg-gray-800 h-[33px] !outline-none w-full text-gray-700 rounded-md dark:text-white duration-200",
                selected
                  ? "!bg-[#3c75cc] text-white"
                  : "text-gray-700 duration-500"
              )
            }>
            <p>Logar</p>
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full transition-all">
          <Tab.Panel className="rounded mmd:p-1 w-full">
            <Form ref={CadastroFormRef} onSubmit={handleSubmitCadastro}>
              <motion.div
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                className="w-full">
                <div className="flex flex-col w-full my-10">
                  <Input
                    name="username"
                    type="text"
                    placeholderSel="username"
                    labelSel="Username:"
                    classSel="w-full lg:px-3 py-2 text-gray-700 dark:text-gray-200 bg-transparent outline-none"
                    maxLength={28}
                    iconSel={
                      <HiUser className="text-gray-700 dark:text-white absolute inset-y-3 ml-2" />
                    }
                    //value={}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholderSel="example@email.com"
                    classSel="w-full lg: px-3 py-2 text-gray-700 dark:text-gray-200 bg-transparent outline-none"
                    iconSel={
                      <MdEmail className="text-gray-700 dark:text-white absolute inset-y-3 ml-2" />
                    }
                    maxLength={28}
                    labelSel="E-mail:"
                    //value={}
                  />
                  <Input
                    name="senha"
                    typeSel={inputType}
                    placeholderSel="senha"
                    labelSel="Senha:"
                    classSel="w-full transition-all px-3 py-2 dark:text-gray-200 text-gray-700 bg-transparent flex outline-none"
                    maxLength={28}
                    iconSel={
                      <HiKey className="text-gray-700 dark:text-white absolute inset-y-3 ml-2" />
                    }
                    iconpassSel={
                      <button type="button" onClick={Changetype}>
                        <HiEye className="text-gray-700 dark:text-white absolute inset-y-3 left-full -ml-8" />
                      </button>
                    }
                    //value={}
                  />
                </div>
                <div className=" flex items-center w-full rounded-md">
                  <button
                    type="submit"
                    className="bg-[#3c75cc] h-[40px] lg:w-[100%] w-[100%] mx-auto px-4 text-white  rounded-md hover:bg-[#284eb6] duration-200 ">
                    Cadastrar
                  </button>
                </div>
                <div className="mt-7 h-[50px] py-10 flex items-center w-full rounded-md">
                  <div className="flex flex-col w-full items-center justify-center ">
                    <div className="flex space-x-4 w-full">
                      <button
                        type="button"
                        onClick={() => loginWithGoogle()}
                        className="!border-gray-300 !border-[1px] cursor-pointer !pointer-events-auto !w-full flex items-center justify-center bg-white p-3 !rounded-md !duration-300 !text-[#e44a2fc0] hover:!bg-gray-300">
                        <FaGoogle size={18} />
                      </button>
                    </div>
                    <a
                      onClick={() => {
                        history("/forgotpassword");
                      }}
                      className="text-gray-800 dark:text-gray-300 text-sm underline py-5 cursor-pointer duration-300">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>
              </motion.div>
            </Form>
          </Tab.Panel>
          <Tab.Panel className="rounded mmd:p-1 w-full">
            <Form ref={LoginFormRef} onSubmit={handleSubmitLogin}>
              <motion.div
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                className="w-full">
                <div className="flex flex-col w-full my-10">
                  <Input
                    name="email"
                    type="email"
                    placeholderSel="useremail@email.com"
                    classSel="w-full lg: px-3 py-2 text-gray-700 bg-transparent dark:text-gray-200 outline-none"
                    iconSel={
                      <MdEmail className="text-gray-700 dark:text-white absolute inset-y-3 ml-2" />
                    }
                    maxLength={28}
                    labelSel="E-mail:"
                    //value={}
                  />
                  <Input
                    name="senha"
                    typeSel={inputType}
                    placeholderSel="senha"
                    labelSel="Senha:"
                    classSel="w-full transition-all px-3 py-2 text-gray-700 dark:text-gray-200 bg-transparent flex outline-none"
                    maxLength={28}
                    iconSel={
                      <HiKey className="text-gray-700 dark:text-white absolute inset-y-3 ml-2" />
                    }
                    iconpassSel={
                      <button type="button" onClick={Changetype}>
                        <HiEye className="text-gray-700 dark:text-white absolute inset-y-3 left-full -ml-8" />{" "}
                      </button>
                    }
                    //value={}
                  />
                </div>
                <div className="flex items-center w-full rounded-md">
                  <button
                    type="submit"
                    className="bg-[#3c75cc] h-[40px] lg:w-[100%] w-[100%] mx-auto px-4 text-white  rounded-md hover:bg-[#284eb6] duration-200 ">
                    Entrar
                  </button>
                </div>
              </motion.div>

              <div className="mt-10 h-[50px] py-10 flex items-center w-full rounded-md">
                <div className="flex flex-col w-full items-center  justify-center ">
                  <a
                    onClick={() => {
                      history("/forgotpassword");
                    }}
                    className="text-gray-800 dark:text-gray-300 text-sm underline py-5 cursor-pointer duration-300">
                    Esqueceu sua senha?
                  </a>
                  <div className="flex space-x-4 ">
                    <a
                      href=""
                      className="border-gray-600 border-[1px] p-3 rounded-full duration-300 text-[#e44a2fc0] hover:bg-[#e44a2fc0] hover:text-white">
                      <FaGoogle size={18} />
                    </a>
                    <a
                      href=""
                      className="border-gray-600 border-[1px] p-3 rounded-full duration-300 text-[#2f52b3] hover:bg-[#2f52b3] hover:text-white">
                      <FaFacebookF size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </Form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <Snackbar
        open={alert?.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ open: false })}>
        <Alert
          onClose={() => setAlert({ open: false })}
          severity={alert?.type}
          sx={{ width: "100%" }}>
          {alert?.description}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
