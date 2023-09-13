import React, { useEffect, useRef, InputHTMLAttributes } from "react";
import { useField } from "@unform/core";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}

const Radio: React.FC<Props> = ({ name, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = "" } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.find((ref) => ref.checked)?.value || "";
      },
      setValue: (refs: HTMLInputElement[], id: string) => {
        const inputRef = refs.find((ref) => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find((ref) => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <div className="flex items-center gap-4">
      {options.map((option, index) => (
        <h1
          className="text-black opacity-50"
          key={option.id}>
          <input
            ref={(ref) => ref && (inputRefs.current[index] = ref)}
            id={option.id}
            type="radio"
            className='mr-2'
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />
          {option.label}
        </h1>
      ))}
    </div>
  );
};

export default Radio;
