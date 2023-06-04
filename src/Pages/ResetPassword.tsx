import { useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { Input } from "../Components/Input/Input";
import { Form } from "@unform/web";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiEye, HiKey } from "react-icons/hi";

function ResetPassword() {
  const ResetaSenhaFormRef = useRef(null);
  const history = useNavigate();

  const [inputType, setInputType] = useState("password");

  const Changetype = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleSubmitResetSenha = async (data: {
    senha: string;
    confirmSenha: string;
  }) => {
    await api
      .post("/resetpassword", {
        senha: data.senha,
        confirmSenha: data.confirmSenha,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <Form ref={ResetaSenhaFormRef} onSubmit={handleSubmitResetSenha}>
      <div className="w-full flex flex-col sm:flex-row bg-login bg-cover">
        <div className="flex flex-col justify-center w-full lg:w-[40%] dark:bg-[#2b2b2b] bg-white items-center h-screen duration-300">
          <div className="text-gray-700 dark:text-white text-[130%] gap-20 mb-4 justify-start flex ">
            Resetar senha
          </div>
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              className="w-full">
              <div className="flex flex-col w-full my-10">
                <Input
                  name="senha"
                  typeSel={inputType}
                  placeholderSel="**********"
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
                <Input
                  name="confirmSenha"
                  typeSel={inputType}
                  placeholderSel="**********"
                  labelSel="Confirmar Senha:"
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
              <div className="flex items-center w-full rounded-md">
                <button
                  type="submit"
                  className="bg-[#3c75cc] h-[40px] lg:w-[100%] w-[100%] mx-auto px-4 text-white  rounded-md hover:bg-[#284eb6] duration-200 ">
                  Resetar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ResetPassword;
