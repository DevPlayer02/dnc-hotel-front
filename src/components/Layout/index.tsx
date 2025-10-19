"use client";

import { ReactNode } from "react";
import CustomImage from "../CustomImage";
import Link from "../Link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { data } = useSession();
  const user = data?.user;

  const pathname = usePathname();
  const showProfileLink = pathname === "/";

  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = user?.avatar;
  const srcUrl = filename
    ? `${base}/uploads/${encodeURIComponent(filename)}`
    : "/no-hotel.jpg";

  return (
    <>
      <header className="relative w-full flex justify-center items-center py-5 border-b border-b-light-grey-400">
        <Link href="/">
          <CustomImage
            src="/logo-dnc.png"
            alt="Logo Escola DNC"
            width={45}
            height={40}
          />
        </Link>
        {showProfileLink && (
          <div className="absolute right-10">
            <Link href="/profile">
              <CustomImage
                src={srcUrl}
                alt={`Photo of ${user?.name}`}
                width={40}
                height={40}
                className="justify-end rounded-full"
              />
            </Link>
          </div>
        )}
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

export default Layout;
