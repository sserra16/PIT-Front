import { useEffect, useState, useRef } from "react";
import user from "../assets/user-solid.svg";
import { FormHandles } from "@unform/core";
import trash from "../assets/trash-solid.svg";
import pen from "../assets/pen-to-square-solid.svg";
import { api } from "../api/api";
import { Dialog } from "@headlessui/react";
import { Form } from "@unform/web";
import { Input } from "../Components/Input";
import Radio from "../Components/Radio";
import { AnimatePresence, motion } from "framer-motion";
// import { useDark } from "../Hooks/dark";
// import { FiSun } from "react-icons/fi";
// import { HiOutlineMoon } from "react-icons/hi";

export default function Home() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    /* const token = JSON.parse(localStorage.getItem("user_token")!);

    api
      .get("authenticate", {
        headers: {
          Authorization: `${token.type} ${token.token}`,
        },
      })
      .then((res) => {
        setUsuario(res.data.user)
      })
      .catch((error) => {
        console.error(error);
      }); */

    buscarEventos();
  }, []);

  const [eventos, setEventos] = useState([]);
  // const [usuario, setUsuario] = useState<any>({});

  // const { isDark, setDark, setLight } = useDark();

  function buscarEventos() {
    api
      .get("/eventos")
      .then((res) => {
        setEventos(res.data);
      })
      .catch((e) => console.error(e));
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEx, setIsOpenEx] = useState(false);
  const [idAtual, setIdAtual] = useState<number>(0);
  const formRef = useRef<FormHandles>(null);

  function handleCreateEvent(data: any) {
    if (data.descricao === "") {
      formRef.current?.setFieldError("descricao", "A descrição é obrigatória");
      return;
    } else if (data.quantidade === "") {
      formRef.current?.setFieldError(
        "quantidade",
        "A quantidade é obrigatória"
      );
      return;
    }

    api
      .post("createevento", {
        descricao: data.descricao,
        visibilidade: data.visibilidade == "0" ? false : true,
        quantidade: data.quantidade,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((erro) => {
        console.error(erro);
      });

    setIsOpen(false);
    buscarEventos();
  }

  function handleDestroyEvent(id: number) {
    api
      .post("destroyevent", { id })
      .then(() => buscarEventos())
      .catch((error) => console.error(error));

    setIsOpenEx(false);
  }

  const options = [
    { id: 0, value: 0, label: "Privado" },
    { id: 1, value: 1, label: "Público" },
  ];

  return (
    <>
      {/* Modal Cadastro */}
      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: false, ease: "easeInOut", duration: 0.2 }}
            onClose={() => setIsOpen(false)}
            className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Novo
                </h1>
                <Form
                  ref={formRef}
                  onSubmit={handleCreateEvent}
                  className="flex flex-col gap-5">
                  <Input
                    name="descricao"
                    typeSel="text"
                    placeholderSel="Descrição"
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                  />
                  <div className="flex items-start flex-col gap-2">
                    <h1 className="opacity-60 text-black font-semibold text-lg">
                      Visibilidade
                    </h1>

                    <Radio
                      name="visibilidade"
                      options={options as any}
                      defaultChecked
                    />
                  </div>
                  <Input
                    name="quantidade"
                    typeSel="number"
                    placeholderSel="Quantidade"
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3c75cc] py-2 w-full px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all">
                      Cadastrar
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal Excluir */}
      <AnimatePresence>
        {isOpenEx && (
          <Dialog
            open={isOpenEx}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: false, ease: "easeInOut", duration: 0.2 }}
            onClose={() => setIsOpenEx(false)}
            className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Excluir
                </h1>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpenEx(false)}
                    className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all">
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDestroyEvent(idAtual)}
                    className="bg-[#D73838] py-2 w-full px-6 text-white rounded-lg hover:bg-[#a92b2b] transition-all">
                    Excluir
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <div className="bg-gray-200 flex flex-col gap-5 w-100 h-screen px-36 py-6">
        <div className="flex gap-4 items-center h-14">
          {/* <div className="text-gray-700 dark:text-white text-[130%] h-full justify-start ml-[1rem] flex items-center">
            {isDark ? (
              <FiSun onClick={setDark} className="cursor-pointer" />
            ) : (
              <HiOutlineMoon onClick={setLight} className="cursor-pointer" />
            )}
          </div> */}
          <div className="rounded-full border-[0.3px] border-black border-opacity-25 p-4 w-14 h-14 cursor-pointer">
            <img src={user} alt="" />
          </div>
          <h1>
            Olá <strong>{/* {usuario.username} */}TESTE!</strong>
          </h1>
        </div>
        <div className="rounded-xl bg-[#D0D0D0] p-6 overflow-x-scroll scrollbar-track-[#3c75cc] scrollbar-thumb-white scrollbar-thin">
          <div className="flex justify-between py-6">
            <h1 className="opacity-40 text-black font-semibold text-2xl">
              Eventos
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#3c75cc] py-2 px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all">
              Criar novo
            </button>
          </div>

          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase text-gray-400 border-b border-[#000] border-opacity-25">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Opções
                </th>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Descrição
                </th>
                <th scope="col" className="px-6 py-3">
                  Visibilidade
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((item: any, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-[#000] border-opacity-25 text-black text-opacity-80">
                    <td className="flex gap-3 mt-3">
                      <button className="bg-[#3c75cc] rounded-lg flex items-center justify-center w-6 h-6 ml-3 hover:bg-[#284eb6] transition-all">
                        <img src={pen} width={10} alt="" />
                      </button>
                      <button
                        onClick={() => {
                          setIdAtual(item.id);
                          setIsOpenEx(true);
                        }}
                        className="bg-[#D73838] rounded-lg flex items-center justify-center w-6 h-6 ml-3 hover:bg-[#a92b2b] transition-all">
                        <img src={trash} width={10} alt="" />
                      </button>
                    </td>
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">{item.descricao}</td>
                    <td className="px-6 py-4">
                      {item.visibilidade == 1 ? "Público" : "Privado"}
                    </td>
                    <td className="px-6 py-4">{item.quantidade}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
