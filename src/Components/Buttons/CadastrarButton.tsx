interface buttonLogin extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const CadastrarButton = ({ active, ...props }: buttonLogin) => {
  return (
    <button
      type="button"
      {...props}
      className={`${
        active ? "!bg-[#3c75cc] !text-white" : "!bg-transparent !text-gray-700"
      } h-[30px] w-[10rem]  px-4 py-auto rounded-md`}>
      Cadastrar
    </button>
  );
};

export default CadastrarButton;
