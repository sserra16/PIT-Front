import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

interface IInput extends React.HTMLProps<HTMLInputElement> {
  name: string;
}

export const Input = ({ name, ...rest }: IInput) => {
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

  return <input name={name} ref={inputRef} {...rest} />;
};
