import Button from "@/components/Button";
import CustomImage from "@/components/CustomImage";
import Link from "@/components/Link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data } = useSession();
  const user = data?.user;
  const headerStyle = user ? "justify-between px-20" : "justify-between px-20";
  const profileIconStyle = user ? "" : "hidden";
  const menuStyle = showMenu ? "" : "sr-only";
  const hrefUser = user?.role === "ADMIN" ? "/my-properties" : "/reservations";

  const logout = () => {
    signOut({ redirect: false }).then(() => {
      setShowMenu(false);
      redirect("/login");
    });
  };

  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = user?.avatar ?? "default-profile.jpg";
  const srcUrl = filename
    ? `${base}/uploads/${encodeURIComponent(filename)}`
    : "/no-hotel.jpg";

  return (
    <header
      className={`w-full flex py-5 border-b border-b-light-grey-400 ${headerStyle}`}
    >
      <Link href="/">
        <CustomImage
          src="/logo-dnc.png"
          alt="Logo Escola DNC"
          width={75}
          height={80}
        />
      </Link>
      <div>
        <div
          className={`flex border border-light-grey-400 py-1 px-4 rounded-full cursor-pointer ${profileIconStyle}`}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <CustomImage
            src="/burguer-icon.svg"
            alt="Menu"
            width={20}
            height={20}
          />
          <CustomImage
            src={srcUrl}
            alt={`Photo of ${user?.name}`}
            width={30}
            height={20}
            className="object-cover justify-end rounded-full ml-2 h-8"
          />
        </div>
        {showMenu && (
          <nav
            className={`absolute border border-light-grey-400 px-6 pt-2 bg-white rounded-2xl shadow-lg right-10 mt-1 ${menuStyle}`}
          >
            <ul className="font-medium">
              <li>
                <Link href="/profile">My profile</Link>
              </li>
              <li className="mt-2">
                <Link href={hrefUser}>
                  {user?.role === "ADMIN" ? "My properties" : "My reservations"}
                </Link>
              </li>
              <hr className="mt-2 border-t border-light-grey-400" />
              <li>
                <Button
                  appearance="danger"
                  className="text-left py-0 px-0"
                  onClick={logout}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
