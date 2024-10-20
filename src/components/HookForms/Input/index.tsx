"use client";

import { InputHTMLAttributes, useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import RenderIf from "@/components/RenderIf";

import styles from "./Input.module.scss";

interface IProps<T extends string>
  extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "number" | "password";
  label?: string;
  htmlFor: T;
  placeholder: string;
  className?: string;
  register?: UseFormRegisterReturn<T>;
  errors?: FieldErrors;
  isErrorValidate?: boolean;
}

const FormInput = <T extends string>(props: IProps<T>) => {
  const {
    type = "text",
    label,
    htmlFor,
    placeholder,
    className,
    register,
    errors,
    isErrorValidate,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={`flex flex-col gap-2 text-sm ${className}`}>
      <RenderIf condition={!!label}>
        <label htmlFor={htmlFor} className="font-medium">
          {label}
        </label>
      </RenderIf>
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : type}
          id={htmlFor}
          placeholder={placeholder}
          style={{ borderColor: isErrorValidate ? "#ef4444" : "#E5E5E5" }}
          className={clsx(
            `w-full px-4 py-3 rounded-lg border border-solid ${styles["input"]}`
          )}
          {...register}
          {...rest}
        />
        {type === "password" && (
          <span
            className="flex p-2 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
          </span>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        name={htmlFor}
        render={({ message }) => (
          <RenderIf condition={!!message}>
            <p className="text-red-600 text-xs">{message}</p>
          </RenderIf>
        )}
      />
    </div>
  );
};

export default FormInput;
