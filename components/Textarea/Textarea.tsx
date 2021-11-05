import React, { ComponentPropsWithoutRef, ReactElement, ReactNodeArray } from "react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";
import { classNames } from "@/utils/class-names";

interface IFormValues {
  fullName: string;
}

type Props = {
  className?: string;
  name: string;
  label: string | ReactElement | ReactNodeArray;
  description?: string;
  errorMessage?: string | ReactElement | ReactNodeArray;
  placeholder?: string;
} & ComponentPropsWithoutRef<"textarea">;

// eslint-disable-next-line react/display-name
export const Textarea = React.forwardRef<HTMLTextAreaElement, Props & ReturnType<UseFormRegister<IFormValues>>>(
  ({ className, onChange, onBlur, name, label, placeholder, description, errorMessage, ...props }, ref) => {
    const commonClassName = "block w-full shadow-sm rounded-md";
    const errorClassName =
      "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500";
    const originalClassName = "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300";
    const inputClassName = classNames(commonClassName, errorMessage ? errorClassName : originalClassName);

    return (
      <div className={className}>
        <label
          htmlFor={name}
          className={classNames("block font-medium", errorMessage ? "text-red-600" : "text-gray-700")}
        >
          {errorMessage ? `${label} ${errorMessage}` : label}
        </label>
        <div className="mt-1 relative">
          <textarea
            name={name}
            id={name}
            className={inputClassName}
            aria-describedby={`${name}-description`}
            {...props}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
          />
          {errorMessage && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-500" id={`${name}-description`}>
            {description}
          </p>
        )}
        {/*{errorMessage && (*/}
        {/*  <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>*/}
        {/*    {errorMessage}*/}
        {/*  </p>*/}
        {/*)}*/}
      </div>
    );
  }
);
