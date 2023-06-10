import React, { useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { Input } from "../../Components/Input";
import { Form } from "@unform/web";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertProps, CircularProgress, Snackbar } from "@mui/material";
import { AlertType } from "../../types";
import MuiAlert from "@mui/material/Alert";

function ForgotPassword() {
  const [alert, setAlert] = useState<AlertType>();
  const [loaded, setLoaded] = useState(true);

  const CadastroFormRef = useRef(null);
  const history = useNavigate();

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmitCadastro = async (data: { email: string }) => {
    setLoaded(false);

    await api
      .post("/forgotpassword", {
        email: data.email,
      })
      .then(() => {
        setAlert({
          description: "Email enviado!",
          open: true,
          type: "success",
        });

        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(true);

        setAlert({
          open: true,
          description: error.response.data.msg,
          type: "error",
        });
      });
  };

  return (
    <>
      <motion.div
        initial={{ x: -100 }}
        whileInView={{ x: 0 }}
        className="w-full">
        <Form
          ref={CadastroFormRef}
          onSubmit={handleSubmitCadastro}
          className="flex flex-col items-center w-full">
          <div className="text-gray-700 dark:text-white text-[130%] mb-4 justify-start flex">
            Recuperar senha
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Input
              name="email"
              type="email"
              placeholderSel="useremail@email.com"
              classSel="w-full lg: px-3 py-2 dark:text-white text-gray-700 bg-transparent outline-none"
              iconSel={
                <MdEmail className="dark:text-white text-gray-700 absolute inset-y-3 ml-2" />
              }
              maxLength={28}
              labelSel="E-mail:"
              //value={}
            />

            <button
              type="submit"
              className="bg-[#3c75cc] h-[40px] lg:w-[100%] w-[100%] mx-auto px-4 text-white  rounded-md hover:bg-[#284eb6] duration-200 ">
              {loaded ? (
                "Enviar email"
              ) : (
                <CircularProgress size={24} color="inherit" />
              )}
            </button>
            <a
              onClick={() => {
                history("/");
              }}
              className="text-gray-800 dark:text-gray-300 text-sm underline cursor-pointer duration-300">
              Voltar ao login
            </a>
          </div>
        </Form>
      </motion.div>

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

export default ForgotPassword;
