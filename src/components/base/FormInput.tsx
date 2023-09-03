"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  transform?: any;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-full block">
      <label htmlFor={name} className="block text-sm text-gray-400 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder=""
        autoComplete="off"
        className="block bg-primary-50 h-12 w-full rounded-xl appearance-none focus:outline-none py-2 px-4 shadow-3xl shadow-shadow-500 border-gray-100 focus:border-primary-100"
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
