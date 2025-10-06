"use client";
import { Reservation } from "@/types/Reservation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { normalizeImageSrc } from "@/helpers/format/image";

type UserDetailProps = { reservation: Reservation };

const UserDetail = ({ reservation }: UserDetailProps) => {
  const { data, status } = useSession();
  const currentRole = data?.user?.role;
  const isLoading = status === 'loading';

  if (isLoading) {
    return (
      <div className="max-w-sm w-full mt-4">
        {/* skeleton */}
      </div>
    );
  }

  if (!currentRole) {
      return null;
  }
  
  const displayUser = currentRole === "USER" 
    ? reservation.hotel.owner 
    : reservation.user;

  const user = displayUser || {}; 
  const avatarSrc = normalizeImageSrc(user.avatar);
  const finalAvatarSrc = avatarSrc || "/default-avatar.png";

  return (
    <div className="mt-4 flex items-center">
      <div className="rounded-full w-14 h-14 object-cover overflow-hidden bg-slate-400 flex items-center justify-center text-white font-bold flex-shrink-0">
        {finalAvatarSrc ? (
          <Image
            src={finalAvatarSrc}
            alt={`Foto do Host ${user.name ?? "user"}`}
            width={56}
            height={56}
            className="w-full h-full object-cover" // <-- Garante que a imagem preencha a div
          />
        ) : (
          <span>{user.name?.[0] ?? "U"}</span>
        )}
      </div>

      <div className="flex flex-col ml-3 justify-center">
        <b>Host: {user.name ?? "—"}</b>
        <span className="font-medium">
          Desde {user.createdAt ? new Date(user.createdAt).getFullYear() : "—"}
        </span>
      </div>
    </div>
  );
};

export default UserDetail;