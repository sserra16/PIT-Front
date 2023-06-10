import React from "react";
import { useDark } from "../../Hooks/dark";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";

type props = {
  children: React.ReactNode;
};

function Layout({ children }: props) {
  const { isDark, setDark, setLight } = useDark();

  return (
    <div className="w-full flex flex-col sm:flex-row bg-login bg-cover">
      <div className="flex justify-center w-full lg:w-[40%] dark:bg-[#2b2b2b] bg-white pt-4 items-center h-screen duration-300">
        <div className="text-gray-700 dark:text-white text-[130%] h-full justify-start ml-[1rem] flex ">
          {isDark ? (
            <FiSun onClick={setDark} className="cursor-pointer" />
          ) : (
            <HiOutlineMoon onClick={setLight} className="cursor-pointer" />
          )}
        </div>
        <div className="w-full h-full lg:h-[70%] pl-12 pr-16 duration-300 dark:bg-[#2b2b2b] bg-white flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
