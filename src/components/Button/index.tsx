import { ButtonHTMLAttributes } from "react";

type AppearanceType = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: AppearanceType;
};

const getAppearanceStyle = (appearance: AppearanceType) =>
  ({
    primary:
      "bg-main-brand-blue-500 text-white hover:bg-main-brand-blue-600 active:bg-main-brand-blue-700 focus:outline-none focus:ring focus:ring-main-brand-blue-300",
    secondary:
      "bg-none border-none text-main-brand-blue-500 hover:bg-snow-white active:bg-snow-white focus:outline-none focus:ring focus:ring-main-brand-blue-300",
  }[appearance]);

const Button = ({
  onClick,
  children,
  appearance = "primary",
  className,
}: ButtonProps) => {
  const commonStyles =
    "py-2 px-6 w-full cursor-pointer border-none rounded-lg font-medium disabled:bg-slate-300 disabled:cursor-not-allowed";
  const appearanceStyles = getAppearanceStyle(appearance);

  return (
    <button
      className={`${commonStyles} ${appearanceStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
