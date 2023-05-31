import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { api } from "../../api/api";

const SocialButtons = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center  justify-center ">
        <a className="text-gray-800 dark:text-gray-300 text-sm underline py-5 cursor-pointer duration-300">
          Esqueceu sua senha?
        </a>
        <div className="flex space-x-4 ">
          <a
            href=""
            onClick={async (e) => {
              e.preventDefault();

              await api
                .get("/google/redirect")
                .then((res) => console.log(res))
                .catch((err) => console.error(err));
            }}
            className="bg-[#e2e2e2] p-3 rounded-full duration-300 text-[#e44a2fc0] hover:bg-[#e44a2fc0] hover:text-white">
            <FaGoogle size={18} />
          </a>
          <a
            href="#"
            className="bg-[#e2e2e2] p-3  rounded-full hover:bg-gray-950 hover:text-white transition-all duration-300">
            <FaApple size={18} />
          </a>
          <a
            href=""
            className="bg-[#e2e2e2] p-3 rounded-full duration-300 text-[#2f52b3] hover:bg-[#2f52b3] hover:text-white">
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialButtons;
