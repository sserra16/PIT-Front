import {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";

import { useField } from "@unform/core";

interface Props {
  name: string;
  classSel?: string;
  descricao: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function File({ name, classSel, descricao, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];

    if (!file) {
      setPreview(null);
    }

    const previewURL = URL.createObjectURL(file);

    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref: HTMLInputElement) {
        ref.value = "";
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <div
        className={`border-dashed overflow-hidden border-2 flex items-center justify-center  cursor-pointer mb-2 ${classSel}`}>
        <label
          htmlFor={name}
          className="text-md mmd:text-xl flex justify-center text-gray-400 hover:!text-gray-500 mmd:p-1 items-center w-full cursor-pointer">
          {preview ? <img src={preview} alt="Preview" className="w-full h-full" /> : descricao}
        </label>
        <input
          type="file"
          id={name}
          name={name}
          ref={inputRef}
          onChange={handlePreview}
          className="hidden"
          {...rest}
        />
      </div>
    </>
  );
}
