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
import { BsInfoLg } from "react-icons/bs";
import { Textarea } from "../Components/textarea";
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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenPerfil, setIsOpenPerfil] = useState(false);
  const [isOpenInfo, setisOpenInfo] = useState(false);
  const [idAtual, setIdAtual] = useState<number>(0);
  const formRef = useRef<FormHandles>(null);
  const formRef3 = useRef<FormHandles>(null);
  const formRef4 = useRef<FormHandles>(null);
  const formRef5 = useRef<FormHandles>(null);

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

  function handleEditPerfil(data: any) {
    /* AHAHHAHAHAHHAHA */
  }
  function handleEditEvent(data: any) {
    /* AHAHHAHAHAHHAHA */
  }
  function handleInfoPerfil(data: any) {
    /* AHAHHAHAHAHHAHA */
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
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Novo
                </h1>
                <Form
                  ref={formRef}
                  onSubmit={handleCreateEvent}
                  className="flex flex-col gap-5"
                >
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
                    placeholderSel="Quantidade de pessoas "
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                  />
                  <div
                    className={`border-dashed !textdarkselect border-2 borderdark4 flex w-full h-48 items-center justify-center cursor-pointer mb-2`}
                  >
                    <label
                      htmlFor="arquivo"
                      className="text-md flex justify-center text-gray-400 hover:!text-gray-500 p-3 mmd:p-1 items-center w-full cursor-pointer"
                    >
                      Inserir imagem do evento
                    </label>
                    <input type="file" className="hidden" id="arquivo" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3c75cc] py-2 w-full px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all"
                    >
                      Cadastrar
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal Editar */}
      <AnimatePresence>
        {isOpenEdit && (
          <Dialog
            open={isOpenEdit}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: false, ease: "easeInOut", duration: 0.2 }}
            onClose={() => setIsOpenEdit(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Editar
                </h1>
                <Form
                  ref={formRef4}
                  onSubmit={handleEditEvent}
                  className="flex flex-col gap-5"
                >
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
                    placeholderSel="Quantidade de pessoas "
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                  />
                  <div
                    className={`border-dashed !textdarkselect border-2 borderdark4 flex w-full h-48 items-center justify-center cursor-pointer mb-2`}
                  >
                    <label
                      htmlFor="arquivo"
                      className="text-md flex justify-center text-gray-400 hover:!text-gray-500 p-3 mmd:p-1 items-center w-full cursor-pointer"
                    >
                      Editar imagem do evento
                    </label>
                    <input type="file" className="hidden" id="arquivo" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpenEdit(false)}
                      className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3c75cc] py-2 w-full px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all"
                    >
                      Editar
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
            className="relative z-50"
          >
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
                    className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDestroyEvent(idAtual)}
                    className="bg-[#D73838] py-2 w-full px-6 text-white rounded-lg hover:bg-[#a92b2b] transition-all"
                  >
                    Excluir
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal Editar usuario */}
      <AnimatePresence>
        {isOpenPerfil && (
          <Dialog
            open={isOpenPerfil}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: false, ease: "easeInOut", duration: 0.2 }}
            onClose={() => setIsOpenPerfil(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Editar Perfil
                </h1>
                <Form
                  ref={formRef3}
                  onSubmit={handleEditPerfil}
                  className="flex flex-col items-center gap-5"
                >
                  <div
                    className={`border-dashed !textdarkselect rounded-[100%] border-2 borderdark4 flex w-[8rem] h-[8rem] items-center    justify-center  cursor-pointer mb-2`}
                  >
                    <label
                      htmlFor="arquivo"
                      className="text-md mmd:text-xl flex justify-center text-gray-400 hover:!text-gray-500 p-3 mmd:p-1 items-center w-full cursor-pointer"
                    >
                      Nova foto
                    </label>
                    <input type="file" className="hidden" id="arquivo" />
                  </div>
                  <Input
                    name="nomeusuario"
                    typeSel="text"
                    placeholderSel="Novo nome de usuário"
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                  />
                  <Input
                    name="emailusuario"
                    typeSel="text"
                    placeholderSel="Novo Email de usuário"
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpenPerfil(false)}
                      className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3c75cc] py-2 w-full px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all"
                    >
                      Cadastrar
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal Info usuario */}
      <AnimatePresence>
        {isOpenInfo && (
          <Dialog
            open={isOpenInfo}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: false, ease: "easeInOut", duration: 0.2 }}
            onClose={() => setisOpenInfo(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Visualizar informações
                </h1>
                <Form
                  ref={formRef5}
                  onSubmit={handleInfoPerfil}
                  className="flex flex-col gap-5"
                >
                  <>
                    <div
                      className={`border-dashed !textdarkselect border-2 borderdark4 flex w-full h-48 items-center justify-center  cursor-pointer mb-2`}
                    >
                      <label
                        htmlFor="arquivo"
                        className="text-md mmd:text-xl flex justify-center text-gray-400 hover:!text-gray-500 p-3 mmd:p-1 items-center w-full cursor-pointer"
                      >
                        Foto do evento
                      </label>
                      <input type="file" className="hidden" id="arquivo" />
                    </div>
                    <div className="flex gap-10 w-full">
                      <Input
                        name="id"
                        typeSel="text"
                        classSel="w-full lg:px-3 !m-0 py-2 bg-transparent outline-none w-[1rem]"
                        labelSel="Id:"
                        value={"3"}
                      />
                      <Input
                        name="visibilidade"
                        typeSel="text"
                        classSel="w-full lg:px-3 !m-0 py-2 bg-transparent outline-none w-[100%]"
                        labelSel="Visibilidade:"
                      />
                    </div>
                    <Textarea
                      name="descricao"
                      typeSel="textarea"
                      placeholderSel="descricao aqui"
                      classSel="w-full lg:px-3 !m-0 py-2 bg-transparent outline-none w-[100%]"
                      labelSel="Descricão:"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setisOpenInfo(false)}
                        className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all"
                      >
                        Fechar
                      </button>
                    </div>
                  </>
                </Form>
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
          <div
            onClick={() => {
              setIsOpenPerfil(true);
            }}
            className="rounded-full border-[0.3px] border-black border-opacity-25 p-4 w-14 h-14 cursor-pointer"
          >
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
              className="bg-[#3c75cc] py-2 px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all"
            >
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
                    className="border-b border-[#000] border-opacity-25 text-black text-opacity-80"
                  >
                    <td className="flex gap-1 mt-3">
                      <button
                        onClick={() => {
                          setIdAtual(item.id);
                          setIsOpenEdit(true);
                        }}
                        className="bg-[#3c75cc] rounded-lg flex items-center justify-center w-6 h-6 ml-3 hover:bg-[#284eb6] transition-all"
                      >
                        <img src={pen} width={10} alt="" />
                      </button>
                      <button
                        onClick={() => {
                          setIdAtual(item.id);
                          setIsOpenEx(true);
                        }}
                        className="bg-[#D73838] rounded-lg flex items-center justify-center w-6 h-6 ml-3 hover:bg-[#a92b2b] transition-all"
                      >
                        <img src={trash} width={10} alt="" />
                      </button>
                      <button
                        onClick={() => {
                          setIdAtual(item.id);
                          setisOpenInfo(true);
                        }}
                        className="bg-[#eacb22] rounded-lg flex items-center justify-center w-6 h-6 ml-3 hover:bg-[#D9BC1F] transition-all"
                      >
                        <BsInfoLg className="!text-white" />
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
