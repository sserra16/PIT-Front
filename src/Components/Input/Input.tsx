import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

interface IInput extends React.HTMLProps<HTMLDivElement> {
  name: string;
  labelSel?: string;
  classSel?: string;
  placeholderSel?: string;
  iconSel?: React.ReactNode;
  iconpassSel?: React.ReactNode;
  htmlforSel?: string;
  typeSel?: string;
}

export const Input = ({
  iconSel,
  placeholderSel,
  classSel,
  labelSel,
  name,
  htmlforSel,
  iconpassSel,
  typeSel,
  ...rest
}: IInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField } = useField(name);

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
        <label htmlFor={name} className="!mb-0 text-gray-700 dark:text-gray-300">{labelSel}</label>
      </div>
      <div className="!mt-0 flex w-full items-center px-2 justify-between border border-gray-300 rounded-md mx-auto my-3">
        {iconSel}
        <input
          name={name}
          ref={inputRef}
          className={` ${classSel} !mt-0`}
          placeholder={placeholderSel}
          type={typeSel}
        />
        {iconpassSel}
      </div>
    </div>
  );
};
