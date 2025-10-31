import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

type LinkProps = NextLinkProps & {
  children: ReactNode;
  className?: string;
  tabIndex?: number;
};

const Link = ({ className, ...props }: LinkProps) => {
  return (
    <NextLink
      {...props}
      className={`text-main-brand-blue-500 font-medium ${className}`}
    />
  );
};

export default Link;
