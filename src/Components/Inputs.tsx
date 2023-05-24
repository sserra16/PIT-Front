import { useState } from "react";
import { HiKey, HiEye } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

const Inputs = () => {
  const [inputType, setInputType] = useState("password");

  const Changetype = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  return (
    <>
      <div className="flex flex-col w-full my-10">
        <div className="flex w-full items-center px-2 justify-between border border-gray-300 rounded-md mx-auto my-3">
          <div className="">
            <MdEmail className="text-gray-700" />
          </div>
          <input
            type="email"
            placeholder="useremail@email.com"
            className="w-full lg: px-3 py-2 text-gray-700 bg-transparent outline-none"
            maxLength={28}
            //value={}
          />
        </div>
        <div className="flex items-center px-2 w-full justify-between border border-gray-300 rounded-md mx-auto my-3">
          <div>
            <HiKey className="text-gray-700" />
          </div>
          <input
            type={inputType}
            placeholder="senha"
            className="w-full transition-all px-3 py-2 text-gray-700 bg-transparent flex outline-none"
            maxLength={28}
            //value={}
          />
          <button onClick={Changetype}>
            <HiEye className="text-gray-700 " />{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Inputs;
