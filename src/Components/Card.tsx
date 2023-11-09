import IconeCategoria from "./IconeCategoria";
import { Evento } from "../types/evento";
import { HiMapPin } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";

type props = {
  evento: Evento;
  callbackParticipa: (id: number) => void;
};

export default function Card({ evento, callbackParticipa }: props) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between gap-16">
        <div className="flex gap-3 items-center">
          <IconeCategoria id={evento.id_categoria} />
          <p className="text-gray-500">{evento.categoria}</p>
        </div>
        <div className="flex gap-1 items-center dark:text-gray-400 text-gray-600">
          <HiMapPin className="opacity-60 text-xl" />
          <p>{`${evento.rua} ${evento.cidade}`}</p>
        </div>
      </div>
      <h1 className="flex gap-2 items-center text-2xl font-bold">
        {evento.descricao}{" "}
        {evento.visibilidade ? "" : <AiFillLock className="text-red-500" />}
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-2 items-center">
            <FaUser className="text-gray-700 dark:text-gray-300" />
            {evento.usuario}
          </div>
          <div>
            <h1 className="">
              {evento.quantidade_atual}
              <span className="font-normal text-gray-800 dark:text-gray-500">
                {" "}
                /{" "}
              </span>
              <span className="text-blue-400 font-bold">
                {evento.quantidade_maxima}
              </span>
            </h1>
          </div>
        </div>
        <button
          onClick={() => callbackParticipa(evento.id)}
          disabled={
            evento.quantidade_atual < evento.quantidade_maxima ? false : true
          }
          className="bg-[#3c75cc] py-1 px-12 text-white rounded-lg hover:bg-[#284eb6] transition-all disabled:cursor-not-allowed disabled:brightness-90">
          Participar
        </button>
      </div>
    </div>
  );
}
