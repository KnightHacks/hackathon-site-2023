import { HTMLProps, forwardRef } from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  error?: FieldError;
} & ReturnType<UseFormRegister<FieldValues>> &
  HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, ...rest },
  ref
) {
  return (
    <label className={`mb-4 flex flex-col ${error && "text-red-500"}`}>
      <span>
        {label} {error && <i className="text-sm"> - {error.message}</i>}
      </span>
      <input
        {...rest}
        ref={ref}
        className={`border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 ${
          error ? "border-red-500 ring-red-500" : "ring-blue-500"
        }`}
      />
    </label>
  );
});

type SelectProps = {
  label: string;
  error?: FieldError;
  options: readonly { label: string; value: string }[] | readonly string[];
} & ReturnType<UseFormRegister<FieldValues>> &
  HTMLProps<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, error, options, ...rest }, ref) {
    return (
      <label className={`mb-4 flex flex-col ${error && "text-red-500"}`}>
        <span>
          {label} {error && <i>{error.message}</i>}
        </span>
        <select
          {...rest}
          ref={ref}
          className={`border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 ${
            error ? "border-red-500 ring-red-500" : "ring-blue-500"
          }`}
        >
          {options.map((option) => (
            <option
              key={typeof option === "string" ? option : option.value}
              value={typeof option === "string" ? option : option.value}
            >
              {typeof option === "string" ? option : option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
);

type TextAreaProps = {
  label: string;
  error?: FieldError;
} & ReturnType<UseFormRegister<FieldValues>> &
  HTMLProps<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, error, ...rest }, ref) {
    return (
      <label className={`mb-4 flex flex-col ${error && "text-red-500"}`}>
        <span>
          {label} {error && <i>{error.message}</i>}
        </span>
        <textarea
          {...rest}
          ref={ref}
          className={`border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 ${
            error ? "border-red-500 ring-red-500" : "ring-blue-500"
          }`}
        />
      </label>
    );
  }
);

type CheckboxProps = {
  label: string;
  error?: FieldError;
} & ReturnType<UseFormRegister<FieldValues>> &
  HTMLProps<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, error, ...rest }, ref) {
    return (
      <label className="mb-2 block">
        <input {...rest} ref={ref} className="mr-2" type="checkbox" />
        {label}
        {error && (
          <p className="text-sm italic text-red-500">{error.message}</p>
        )}
      </label>
    );
  }
);
