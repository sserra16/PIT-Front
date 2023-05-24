interface buttonLogin extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const Button = ({ active, ...props }: buttonLogin) => {
  return (
    <>
      <button
        {...props}
        type="button"
        className={`${
          active
            ? "!bg-[#3c75cc] !text-white"
            : "!bg-transparent !text-gray-700"
        } h-[30px] w-[10rem] active:text-white  py-auto rounded-md `}>
        Entrar
      </button>
    </>
  );
};

export default Button;
