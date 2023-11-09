import { useEffect, useState, useRef } from "react";
import { FormHandles } from "@unform/core";
import { Evento } from "../types/evento.ts";
import { api } from "../api/api";
import { Dialog } from "@headlessui/react";
import { Form } from "@unform/web";
import { Input } from "../Components/Input";
import File from "../Components/File";
import Radio from "../Components/Radio";
import { AnimatePresence, motion } from "framer-motion";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/user.tsx";
import LinearProgress from "@mui/material/LinearProgress";
import { buscarUsuario } from "../api/functions/BuscarUsuario.ts";
import {
  buscarEventos,
  buscarMeusEventos,
} from "../api/functions/BuscarEventos.ts";
import SelectCategoria from "../Components/SelectCategoria.tsx";
import { BiLogOut, BiMapAlt } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";
import { useDark } from "../Hooks/dark.tsx";
import Card from "../Components/Card.tsx";
import Swal from "sweetalert2";

export default function Home() {
  const { usuario, setUsuario, image, setImage } = useUser();

  const [eventos, setEventos] = useState<Evento[]>([]);
  // const [meusEventos, setMeusEventos] = useState(false);

  const history = useNavigate();

  const getUser = async (paramToken: { type: string; token: string }) => {
    await buscarUsuario(paramToken)
      .then((res) => {
        if (res.imageUrl) {
          setImage(res.imageUrl);
        }
        setUsuario(res);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const getEventos = async () => {
    await buscarEventos()
      .then((res) => {
        setEventos(res);
        setLoadPage(true);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const getMeusEventos = async () => {
    if (!usuario.id) {
      Swal.fire({
        title: "Erro",
        icon: "error",
        html: "O usuário não está logado!",
      });
      return;
    }

    buscarMeusEventos(usuario.id)
      .then((res) => {
        setEventos(res);
        setLoadPage(true);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const token = useRef<{ type: string; token: string }>({
    type: "",
    token: "",
  });

  useEffect(() => {
    const tokenLocal = localStorage.getItem(`user_token`) ?? "";

    if (tokenLocal == "") {
      history("/erro");
      return;
    }

    token.current = JSON.parse(tokenLocal);

    getUser(token.current);
    getEventos();
  }, []);

  const [loadPage, setLoadPage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPerfil, setIsOpenPerfil] = useState(false);

  const formRefCreate = useRef<FormHandles>(null);
  const formRefEditaUsuario = useRef<FormHandles>(null);
  const { isDark, setDark, setLight } = useDark();

  /* Criar Evento */
  type createEventoData = {
    descricao: string;
    visibilidade: string;
    quantidade: string;
    categoria: string;
    cep: string;
    cidade: string;
    estado: string;
    pais: string;
    rua: string;
  };

  async function handleCreateEvent(data: createEventoData) {
    if (data.descricao === "") {
      formRefCreate.current?.setFieldError(
        "descricao",
        "A descrição é obrigatória"
      );
      return;
    } else if (data.quantidade === "") {
      formRefCreate.current?.setFieldError(
        "quantidade",
        "A quantidade é obrigatória"
      );
      return;
    }

    await api
      .post("createevento", {
        descricao: data.descricao,
        visibilidade: data.visibilidade == "0" ? false : true,
        quantidade: data.quantidade,
        id_categoria: data.categoria,
        id_usuario: usuario.id,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        pais: data.pais,
        rua: data.rua,
        quantidade_atual: 0,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((erro) => {
        console.error(erro);
      });

    setIsOpen(false);
    getEventos();
  }

  /* Editar Perfil */
  type editPerfilData = {
    nomeusuario: string;
    imagem: string;
  };

  async function handleEditPerfil(data: editPerfilData) {
    await api
      .post("/edituser", {
        id: usuario.id,
        username: data.nomeusuario,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });

    if (data.imagem) {
      const imageData = new FormData();
      imageData.append("imagem", data.imagem);
      imageData.append("id", usuario.id ? usuario.id.toString() : "");

      await api
        .post("/insereimagem", imageData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setIsOpenPerfil(false);
    getUser(token.current);
    getEventos();
  }

  async function handleParticipa(id: number) {
    await api.post("/participar", { id });
    getEventos();
  }

  const options = [
    { id: "0", value: "0", label: "Privado" },
    { id: "1", value: "1", label: "Público" },
  ];

  return (
    <>
      {/* Modal Criar */}
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
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-4xl rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white dark:bg-gray-800">
                <h1 className="opacity-40 text-black font-semibold text-xl dark:text-white">
                  Novo
                </h1>
                <Form
                  ref={formRefCreate}
                  onSubmit={handleCreateEvent}
                  className="flex gap-5">
                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="opacity-60 text-black dark:text-gray-300 font-semibold text-lg">
                            Descrição
                          </h1>

                          <Input
                            name="descricao"
                            typeSel="text"
                            placeholderSel="Descrição"
                            classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                          />
                        </div>

                        <div className="flex items-start h-full flex-col gap-2">
                          <h1 className="opacity-60 text-black font-semibold dark:text-gray-300 text-lg">
                            Visibilidade
                          </h1>

                          <Radio
                            name="visibilidade"
                            options={options}
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="opacity-60 dark:text-gray-300 text-black font-semibold text-lg">
                            Quantidade
                          </h1>
                          <Input
                            name="quantidade"
                            typeSel="number"
                            placeholderSel="Quantidade de pessoas "
                            classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                          />
                        </div>

                        <div className="flex items-start flex-col">
                          <h1 className="dark:text-gray-300 opacity-60 text-black font-semibold text-lg">
                            Categoria
                          </h1>

                          <SelectCategoria />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="dark:text-gray-300 opacity-60 text-black font-semibold text-lg">
                            Rua
                          </h1>
                          <Input
                            name="rua"
                            typeSel="text"
                            placeholderSel="Rua Avelino ..."
                            classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                          />
                        </div>

                        <div className="flex items-start flex-col gap-2">
                          <h1 className="dark:text-gray-300 opacity-60 text-black font-semibold text-lg">
                            Cidade
                          </h1>

                          <Input
                            name="cidade"
                            typeSel="text"
                            placeholderSel="Esmeraldas"
                            classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="dark:text-gray-300 opacity-60 text-black font-semibold text-lg">
                            CEP
                          </h1>
                          <Input
                            name="cep"
                            typeSel="text"
                            placeholderSel="32490042"
                            classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                          />
                        </div>

                        <div className="flex items-start flex-col gap-2">
                          <h1 className="dark:text-gray-300 opacity-60 text-black font-semibold text-lg">
                            País
                          </h1>

                          <Input
                            name="pais"
                            typeSel="text"
                            placeholderSel="Brasil"
                            classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="dark:text-gray-300 opacity-60 text-black font-semibold text-lg">
                            Estado
                          </h1>
                          <Input
                            name="estado"
                            typeSel="text"
                            placeholderSel="Minas Gerais"
                            classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
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
                  </div>
                </Form>
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
            className="relative z-50">
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-xl rounded-xl flex flex-col gap-5 items-center p-3 sm:p-20 justify-center bg-white dark:bg-gray-800">
                <h1 className="opacity-40 text-black font-semibold text-xl dark:text-white">
                  Editar Perfil
                </h1>
                <Form
                  ref={formRefEditaUsuario}
                  onSubmit={handleEditPerfil}
                  className="flex flex-col items-center gap-5 w-full">
                  <File
                    descricao="Nova foto"
                    name="imagem"
                    classSel="rounded-[100%] w-[8rem] h-[8rem]"
                  />
                  <Input
                    name="nomeusuario"
                    typeSel="text"
                    placeholderSel="Novo nome de usuário"
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                    valueSel={usuario.username}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpenPerfil(false)}
                      className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3c75cc] py-2 w-full px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all">
                      Salvar
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <div className="bg-gray-200 dark:bg-gray-700 transition-all flex flex-col gap-5 w-100 h-screen px-36 py-6 dark:text-white">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-4 items-center py-2">
            <div
              onClick={() => {
                setIsOpenPerfil(true);
              }}
              className="group relative rounded-full hover:before:content-[''] hover:before:absolute hover:before:-inset-1 hover:before:bg-black hover:before:opacity-50 border-[0.3px] border-black border-opacity-25 overflow-hidden w-20 h-20 cursor-pointer flex items-center justify-center">
              <img
                src={image ? image : "Loading..."}
                alt=""
                className={`${
                  image
                    ? "w-full h-full object-cover"
                    : "w-full h-full object-contain p-5"
                }`}
              />
              <BsPencil className="hidden group-hover:block absolute text-white" />
            </div>
            <h1>
              Olá <strong>{usuario.username}!</strong>
            </h1>
            <div className="text-gray-700 dark:text-white text-[130%] h-full justify-start ml-[1rem] flex items-center">
              {isDark ? (
                <FiSun onClick={setDark} className="cursor-pointer" />
              ) : (
                <HiOutlineMoon onClick={setLight} className="cursor-pointer" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <h1
              onClick={() => {
                // history("/meus")
                getMeusEventos();
              }}
              className="text-lg dark:!text-gray-400 font-semibold hover:!text-[#3c75cc] dark:hover:!text-[#3c75cc] transition-all !text-gray-600 cursor-pointer">
              Meus eventos
            </h1>
            <button
              onClick={() => {
                api
                  .get("/logout")
                  .then((res) => {
                    localStorage.removeItem("user_token");
                    console.log(res);
                  })
                  .catch((error) => console.error(error));
                history("/login");
              }}
              className="bg-[#3c75cc] py-2 px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all">
              <BiLogOut className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-[#D0D0D0] dark:bg-gray-800 p-6 overflow-x-scroll scrollbar-track-[#3c75cc] scrollbar-thumb-white scrollbar-thin">
          <div className="flex justify-between py-6">
            <h1 className="opacity-40 text-black font-semibold text-2xl dark:text-white">
              Eventos
            </h1>

            <div className="flex items-center gap-4">
              <button
                onClick={() => history("/mapa")}
                className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 text-white rounded-lg transition-all">
                <BiMapAlt className="text-2xl" />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#3c75cc] py-2 px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all">
                Criar novo
              </button>
            </div>
          </div>

          {loadPage ? (
            <div className="flex gap-5 flex-wrap justify-start">
              {eventos.length > 0 ? (
                eventos.map((item, index) => {
                  return (
                    <Card
                      callbackParticipa={handleParticipa}
                      evento={item}
                      key={index}
                    />
                  );
                })
              ) : (
                <h1 className="text-gray-600 text-xl">
                  Nenhum evento disponível, volte mais tarde! 😁
                </h1>
              )}
            </div>
          ) : (
            <LinearProgress className="!w-full" />
          )}
        </div>
      </div>
    </>
  );
}
