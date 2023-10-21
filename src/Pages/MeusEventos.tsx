import { useEffect, useState, useRef } from "react";
import user from "../assets/user-solid.svg";
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
import { AiFillLock } from "react-icons/ai";
import { HiMiniMapPin } from "react-icons/hi2";
import { Textarea } from "../Components/textarea";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/user.tsx";
import LinearProgress from "@mui/material/LinearProgress";
import { buscarUsuario } from "../api/functions/BuscarUsuario.ts";
import { buscarMeusEventos } from "../api/functions/BuscarEventos.ts";
import SelectCategoria from "../Components/SelectCategoria.tsx";
import IconeCategoria from "../Components/IconeCategoria.tsx";
import { FaUser } from "react-icons/fa";
import { BiLogOut, BiMapAlt } from "react-icons/bi";

// import { BsFillGearFill } from "react-icons/bs";
// import { useDark } from "../Hooks/dark";
// import { FiSun } from "react-icons/fi";
// import { HiOutlineMoon } from "react-icons/hi";

export default function MeusEventos() {
  const { usuario, setUsuario } = useUser();
  const [loadPage, setLoadPage] = useState(false);
  const [image, setImages] = useState("");
  const [eventos, setEventos] = useState<Evento[]>([]);
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
  const history = useNavigate();

  const tokenLocal = localStorage.getItem("user_token");
  let token: { type: string; token: string };

  /* Validando se o usuário está logado */
  if (!tokenLocal) {
    history("/erro");
  } else {
    token = JSON.parse(tokenLocal);
  }

  useEffect(() => {
    const fetchData = async () => {
      await buscarUsuario(token)
        .then((res) => {
          if (res.imageUrl) {
            setImages(res.imageUrl);
          }
          setUsuario(res);
        })
        .catch((error) => {
          throw new Error(error);
        });

      await buscarMeusEventos(usuario.id ? usuario.id : 4)
        .then((res) => {
          setEventos(res);
          setLoadPage(true);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };

    fetchData();
  }, []);

  // const { isDark, setDark, setLight } = useDark();

  async function handleCreateEvent(data: any) {
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
    const eventos = await buscarMeusEventos(usuario.id ? usuario.id : 4);
    setEventos(eventos);
  }

  async function handleEditPerfil(data: any) {
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
    const user = await buscarUsuario(token);
    setUsuario(user);

    if (user.imageUrl) {
      setImages(user.imageUrl);
    }
  }

  async function handleEditEvent(data: any) {
    await api
      .post("/editevento", {
        id: idAtual,
        descricao: data.descricao,
        quantidade: data.quantidade,
        visibilidade: data.visibilidade,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

    setIsOpenEdit(false);
    const eventos = await buscarMeusEventos(usuario.id ? usuario.id : 4);
    setEventos(eventos);
  }

  function handleInfoPerfil(data: any) {
    /* AHAHHAHAHAHHAHA */
  }

  async function handleDestroyEvent(id: number) {
    await api
      .post("destroyevent", { id })
      .catch((error) => console.error(error));

    const eventos = await buscarMeusEventos(usuario.id ? usuario.id : 4);
    setEventos(eventos);

    setIsOpenEx(false);
  }

  async function HandleParticipa(id: number) {
    await api.post("/participar", { id });
    const eventos = await buscarMeusEventos(usuario.id ? usuario.id : 4);
    setEventos(eventos);
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
              <Dialog.Panel className="w-full max-w-4xl rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Novo
                </h1>
                <Form
                  ref={formRef}
                  onSubmit={handleCreateEvent}
                  className="flex gap-5">
                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="opacity-60 text-black font-semibold text-lg">
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
                          <h1 className="opacity-60 text-black font-semibold text-lg">
                            Visibilidade
                          </h1>

                          <Radio
                            name="visibilidade"
                            options={options as any}
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="opacity-60 text-black font-semibold text-lg">
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
                          <h1 className="opacity-60 text-black font-semibold text-lg">
                            Categoria
                          </h1>

                          <SelectCategoria />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-start flex-col gap-2">
                          <h1 className="opacity-60 text-black font-semibold text-lg">
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
                          <h1 className="opacity-60 text-black font-semibold text-lg">
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
                          <h1 className="opacity-60 text-black font-semibold text-lg">
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
                          <h1 className="opacity-60 text-black font-semibold text-lg">
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
                          <h1 className="opacity-60 text-black font-semibold text-lg">
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
            className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Editar
                </h1>
                <Form
                  ref={formRef4}
                  onSubmit={handleEditEvent}
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
                    placeholderSel="Quantidade de pessoas "
                    classSel="w-full lg:px-3 py-2 bg-transparent outline-none"
                  />
                  <File
                    descricao="Editar imagem"
                    classSel="w-full h-36"
                    name="imagemevento"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpenEdit(false)}
                      className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3c75cc] py-2 w-full px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all">
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
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-xl rounded-xl flex flex-col gap-5 items-center p-3 sm:p-20 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Editar Perfil
                </h1>
                <Form
                  ref={formRef3}
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
            className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded-xl flex flex-col gap-5 items-center p-10 justify-center bg-white">
                <h1 className="opacity-40 text-black font-semibold text-xl">
                  Visualizar informações
                </h1>
                <Form
                  ref={formRef5}
                  onSubmit={handleInfoPerfil}
                  className="flex flex-col gap-5">
                  <Input
                    name="id"
                    typeSel="text"
                    placeholderSel="id aqui"
                    classSel="w-full lg:px-3 !m-0 py-2 bg-transparent outline-none w-[25%]"
                    labelSel="Id:"
                    disabled
                    valueSel={JSON.parse(JSON.stringify(eventos[idAtual])).id}
                  />
                  <Input
                    name="visibilidade"
                    typeSel="text"
                    placeholderSel="visibilidade aqui"
                    classSel="w-full lg:px-3 !m-0 py-2 bg-transparent outline-none w-[100%]"
                    labelSel="Visibilidade:"
                    disabled
                    valueSel={
                      JSON.parse(JSON.stringify(eventos[idAtual]))
                        .visibilidade == 1
                        ? "Público"
                        : "Privado"
                    }
                  />
                  <Textarea
                    name="descricao"
                    placeholderSel="descricao aqui"
                    classSel="w-full lg:px-3 !m-0 py-2 bg-transparent outline-none w-[100%]"
                    valueSel={
                      JSON.parse(JSON.stringify(eventos[idAtual])).descricao
                    }
                    labelSel="Descricão:"
                    disabled
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setisOpenInfo(false)}
                      className="bg-gray-500 py-2 w-full px-6 text-white rounded-lg hover:bg-gray-600 transition-all">
                      Fechar
                    </button>
                  </div>
                </Form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <div className="bg-gray-200 flex flex-col gap-5 w-100 h-screen px-36 py-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-4 items-center py-2">
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
              className="group relative rounded-full hover:before:content-[''] hover:before:absolute hover:before:-inset-1 hover:before:bg-black hover:before:opacity-50 border-[0.3px] border-black border-opacity-25 overflow-hidden w-20 h-20 cursor-pointer flex items-center justify-center">
              <img
                src={image ? image : user}
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
          </div>
          <div className="flex items-center gap-6">
            <h1 onClick={() => history('/home')} className="text-lg font-semibold hover:text-[#3c75cc] transition-all text-gray-600 cursor-pointer">
              Todos Eventos
            </h1>
            <button
              onClick={() => history("/login")}
              className="bg-[#3c75cc] py-2 px-6 text-white rounded-lg hover:bg-[#284eb6] transition-all">
              <BiLogOut className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-[#D0D0D0] p-6 overflow-x-scroll scrollbar-track-[#3c75cc] scrollbar-thumb-white scrollbar-thin">
          <div className="flex justify-between py-6">
            <h1 className="opacity-40 text-black font-semibold text-2xl">
              Meus Eventos
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
                    <div
                      key={index}
                      className="rounded-lg bg-white p-4 flex flex-col gap-8">
                      <div className="flex items-center justify-between gap-16">
                        <div className="flex gap-3 items-center">
                          <IconeCategoria id={item.id_categoria} />
                          <p className="text-gray-500">{item.categoria}</p>
                        </div>
                        <div className="flex gap-1 items-center text-gray-600">
                          <HiMiniMapPin className="opacity-60 text-xl" />
                          <p>{`${item.rua} ${item.cidade}`}</p>
                        </div>
                      </div>
                      <h1 className="flex gap-2 items-center text-2xl font-bold">
                        {item.descricao}{" "}
                        {item.visibilidade ? (
                          ""
                        ) : (
                          <AiFillLock className="text-red-500" />
                        )}
                      </h1>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-700" />
                          <h1 className="">
                            {item.quantidade_atual}
                            <span className="font-normal text-gray-800">
                              {" "}
                              /{" "}
                            </span>
                            <span className="text-blue-400 font-bold">
                              {item.quantidade_maxima}
                            </span>
                          </h1>
                        </div>
                        <button
                          onClick={() => HandleParticipa(item.id)}
                          disabled={
                            item.quantidade_atual < item.quantidade_maxima
                              ? false
                              : true
                          }
                          className="bg-[#3c75cc] py-1 px-12 text-white rounded-lg hover:bg-[#284eb6] transition-all disabled:cursor-not-allowed disabled:brightness-90">
                          Participar
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1 className="text-gray-600 text-xl">
                  Você não criou nenhum evento, crie agora!!⬆️
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

{
  /*  */
}
