import { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string | null | boolean;
};

const TextField = ({
  id,
  type = "text",
  label,
  className,
  error,
  ...props
}: TextFieldProps) => {
  const defaultStyle =
    "border border-light-grey-600 rounded-lg w-full px-4 py-2";
  const errorStyle = "border-red-500";

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        {" "}
        {label}{" "}
      </label>
      <input
        id={id}
        type={type}
        placeholder={label}
        className={`${defaultStyle} ${error ? errorStyle : ''}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default TextField;
