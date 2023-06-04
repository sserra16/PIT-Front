import { useRef } from "react";
import { MdEmail } from "react-icons/md";
import { Input } from "../Components/Input/Input";
import { Form } from "@unform/web";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const CadastroFormRef = useRef(null);
  const history = useNavigate();
  
  const handleSubmitCadastro = async (data: { email: string }) => {
    await api
      .post("/forgotpassword", {
        email: data.email,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <Form ref={CadastroFormRef} onSubmit={handleSubmitCadastro}>
      <div className="w-full flex flex-col sm:flex-row bg-login bg-cover">
        <div className="flex flex-col justify-center w-full lg:w-[40%] dark:bg-[#2b2b2b] bg-white items-center h-screen duration-300">
          <div className="text-gray-700 dark:text-white text-[130%] gap-20 mb-4 justify-start flex ">
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

            <button
              type="submit"
              className="bg-[#3c75cc] h-[40px] lg:w-[100%] w-[100%] mx-auto px-4 text-white  rounded-md hover:bg-[#284eb6] duration-200 ">
              Enviar email
            </button>
            <a
              onClick={() => {
                history("/");
              }}
              className="text-gray-800 dark:text-gray-300 text-sm underline cursor-pointer duration-300">
              Voltar ao login
            </a>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ForgotPassword;
