import pessoas from "../assets/pessoas.png";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const history = useNavigate();

  return (
    <div className="bg-[#f3f3f3] h-[100vh] w-full">
      <div className="p-[3rem]">
        <p className="text-2xl font-black">Time<span className="text-[#3c75cc]">Out</span>!</p>
      </div>
      <div className="flex w-full mt-[5rem] px-36">
        <div className="flex w-[45%] flex-col text-left">
          <p className="text-black text-4xl font-extrabold">
            Descubra e Participe de{" "}
            <span className="text-[#3c75cc]"> Eventos </span> Online Incríveis
          </p>
          <p className="text-black opacity-70 text-lg font-bold mt-8 w-[60%]">
            Explore uma vasta gama de experiências virtuais e mergulhe no mundo
            dos eventos online. Encontre, reserve e conecte-se com eventos
            emocionantes e comunidades inspiradoras de qualquer lugar, a
            qualquer hora.
          </p>
          <button
            onClick={() => history("/login")}
            className="px-6 mt-4 cursor-pointer py-2 rounded-md hover:bg-[#284eb6] bg-[#3c75cc] w-[40%] text-md text-white font-bold"
          >
            Ir para a tela de login
          </button>
        </div>
        <div>
          <img src={pessoas} alt="pessoas" />
        </div>
      </div>
    </div>
  );
}
