import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type LoadingButtonProps = {
  loading: boolean;
  disabled: boolean;
  btnColor?: string;
  textColor?: string;
  className?: string;
  children: React.ReactNode;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  textColor = "text-white",
  btnColor = "bg-indigo-600",
  className = "",
  children,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={twMerge(
        `h-12 py-3 font-semibold rounded-xl outline-none border-none flex justify-center shadow-3xl shadow-shadow-500 w-full`,
        `${disabled ? "bg-indigo-200" : btnColor} ${textColor} ${
          loading && "bg-indigo-300 "
        } ${className}`
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-slate-500 inline-block">Loading...</span>
        </div>
      ) : (
        <span className={`${textColor}`}>{children}</span>
      )}
    </button>
  );
};

export default LoadingButton;
