import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

interface Textarea extends React.HTMLProps<HTMLDivElement> {
  name: string;
  labelSel?: string;
  classSel?: string;
  placeholderSel?: string;
  iconSel?: React.ReactNode;
  iconpassSel?: React.ReactNode;
  disabled?: boolean;
  valueSel?: any;
}

export const Textarea = ({
  iconSel,
  placeholderSel,
  classSel,
  labelSel,
  name,
  iconpassSel,
  valueSel,
  disabled = false,
  ...rest
}: Textarea) => {
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
      <div>
        <label
          htmlFor={name}
          className={`!mb-0 ${
            error ? "text-red-400" : "text-gray-700 dark:text-gray-300"
          } duration-300`}>
          {error ? error : labelSel}
        </label>
      </div>
      <div className="relative">
        {iconSel}
        <textarea
          id={name}
          name={name}
          disabled={disabled}
          defaultValue={valueSel ? valueSel : ''}
          className={` ${classSel} !pl-8 !mt-0 ${
            error
              ? " border border-red-500 dark:border-red-500"
              : "focus:outline-[#3c75cc] outline-offset-0 border border-gray-300 dark:border-gray-700"
          } transition-all placeholder:text-gray-400 dark:placeholder:text-gray-400 flex w-full items-center px-2 justify-between duration-300 rounded-md mx-auto my-3`}
          placeholder={placeholderSel}
        />
        {iconpassSel}
      </div>
    </div>
  );
};
