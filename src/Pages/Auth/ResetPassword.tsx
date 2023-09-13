import React from "react";
import { useRef, useState } from "react";
import { Input } from "../../Components/Input";
import { Form } from "@unform/web";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HiEye, HiKey } from "react-icons/hi";
import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AlertType } from "../../types";

function ResetPassword() {
  const ResetaSenhaFormRef = useRef(null);

  const { token, email } = useParams();
  const [alert, setAlert] = useState<AlertType>();

  const [inputType, setInputType] = useState("password");

  const Changetype = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmitResetSenha = async (data: {
    senha: string;
    confirmSenha: string;
  }) => {
    await api
      .post(`/resetpassword/${token}/${email}`, {
        newPassword: data.senha,
        confirmPassword: data.confirmSenha,
      })
      .then(() =>
        setAlert({
          description: "Senha alterada!",
          open: true,
          type: "success",
        })
      )
      .catch((error) =>
        setAlert({
          description: error.response.data.msg,
          open: true,
          type: "error",
        })
      );
  };

  return (
    <>
      <Form
        ref={ResetaSenhaFormRef}
        onSubmit={handleSubmitResetSenha}
        className="w-full flex flex-col items-center">
        <div className="text-gray-700 dark:text-white text-[130%] gap-20 mb-4 justify-start flex ">
          Resetar senha
        </div>
        <div className="flex flex-col gap-3 w-full">
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
                classSel="w-full transition-all px-3 py-2 text-white bg-transparent flex outline-none"
                maxLength={28}
                iconSel={
                  <HiKey className="dark:text-white text-gray-700 absolute inset-y-3 ml-2" />
                }
                iconpassSel={
                  <button type="button" onClick={Changetype}>
                    <HiEye className="dark:text-white text-gray-700 absolute inset-y-3 left-full -ml-8" />{" "}
                  </button>
                }
                //value={}
              />
              <Input
                name="confirmSenha"
                typeSel={inputType}
                placeholderSel="**********"
                labelSel="Confirmar Senha:"
                classSel="w-full transition-all px-3 py-2 text-white bg-transparent flex outline-none"
                maxLength={28}
                iconSel={
                  <HiKey className="dark:text-white text-gray-700 absolute inset-y-3 ml-2" />
                }
                iconpassSel={
                  <button type="button" onClick={Changetype}>
                    <HiEye className="dark:text-white text-gray-700 absolute inset-y-3 left-full -ml-8" />{" "}
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
      </Form>
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
}

export default ResetPassword;
