import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

interface IInput extends React.HTMLProps<HTMLDivElement> {
  name: string;
  labelSel?: string;
  classSel?: string;
  placeholderSel?: string;
  iconSel?: React.ReactNode;
  iconpassSel?: React.ReactNode;
  typeSel?: string;
  valueSel?: string;
  readonlySel?: boolean;
  disabled?: boolean;
}

export const Input = ({
  iconSel,
  placeholderSel,
  classSel,
  labelSel,
  name,
  iconpassSel,
  typeSel,
  valueSel,
  readonlySel,
  disabled = false,
  ...rest
}: IInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
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
    <div {...rest}>
      <label
        htmlFor={name}
        className={`!mb-0 ${
          error ? "text-red-400" : "!text-gray-700 dark:!text-gray-300"
        } duration-300`}>
        {error ? error : labelSel}
      </label>
      <div className="relative mt-2">
        {iconSel}
        <input
          name={name}
          ref={inputRef}
          disabled={disabled}
          className={` ${classSel} !pl-8 !mt-0 ${
            error
              ? " border border-red-500 dark:border-red-500"
              : "focus:outline-[#3c75cc] outline-offset-0 border border-gray-300 dark:border-gray-700"
          } transition-all dark:text-white placeholder:text-gray-400 bg-gray-50 dark:placeholder:text-gray-400 flex w-full items-center px-2 justify-between duration-300 rounded-md mx-auto my-3`}
          placeholder={placeholderSel}
          type={typeSel}
          defaultValue={valueSel ? valueSel : ""}
        />
        {iconpassSel}
      </div>
    </div>
  );
};
