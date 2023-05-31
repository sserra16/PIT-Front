import React, { useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { Input } from "../Components/Input/Input";
import { Form } from "@unform/web";
import { HiKey, HiEye, HiUser } from "react-icons/hi";

function ForgotPassword() {
  const CadastroFormRef = useRef(null);

  const [inputType, setInputType] = useState("password");

  const Changetype = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleSubmitCadastro = async () => {
    /* 
    if (data.username === "") {
        setOpen7(true);
    }
    await api
      .post("/cadastro", {
        username: data.username,
        email: data.email,
        password: data.senha,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error)); */
  };

  return (
    <Form ref={CadastroFormRef} onSubmit={handleSubmitCadastro}>
      <div className="w-full flex flex-col sm:flex-row bg-login bg-cover">
        <div className="flex flex-col justify-center w-full lg:w-[40%] dark:bg-[#2b2b2b] bg-white items-center h-screen duration-300">
          <div className="text-gray-700 dark:text-white text-[130%] gap-20 border-2 justify-start ml-[1rem] mt-[2rem] flex ">
            Recuperar senha
          </div>
          <div className="flex flex-col gap-3">
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
      </div>
    </Form>
  );
}

export default ForgotPassword;
