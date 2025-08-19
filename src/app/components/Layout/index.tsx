import { ReactNode } from "react";
import Image from "next/image";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="w-full flex justify-center py-5 border-b border-b-light-grey-400">
        <Image src="/logo-dnc.png" alt="Logo Escola DNC" width={45} height={40}/>
      </header>
      <main className="w-full flex justify-center align-middle">
        {children}
      </main>
      <footer className="w-full flex justify-center py-6 bg-snow-white border-t border-t-light-grey-500">
        © 2024 Escola DNC - Hotels, Inc.
      </footer>
    </>
  );
};
