import { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { api } from "../api/api";

export default function SelectCategoria() {
  const [categorias, setCategorias] = useState([
    {} as { id: number; nome: string },
  ]);

  const { fieldName, registerField } = useField("categoria");
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    api
      .get("/categorias")
      .then((result) => {
        setCategorias(result.data);
      })
      .catch((error) => {
        console.log(error);
      });

    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <select
      id="categoria"
      name="categoria"
      ref={selectRef}
      className="focus:outline-[#3c75cc] outline-offset-0 border border-gray-300 dark:border-gray-700 transition-all bg-gray-50 dark:placeholder:text-gray-400 flex w-full items-center px-2 justify-between duration-300 rounded-md my-2 py-2">
      {categorias.map((item) => {
        return (
          <option className="text-gray-400" key={item.id} value={item.id}>
            {item.nome}
          </option>
        );
      })}
    </select>
  );
}
