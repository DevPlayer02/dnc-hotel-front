"use client";
import { Reservation } from "@/types/Reservation";
import { useSession } from "next-auth/react";
import { normalizeImageSrc } from "@/helpers/format/image";
import CustomImage from "../CustomImage";

type UserDetailProps = { reservation: Reservation };

const UserDetail = ({ reservation }: UserDetailProps) => {
  const { data, status } = useSession();
  const currentRole = data?.user?.role;
  const isLoading = status === "loading";

  if (isLoading) {
    return <div className="max-w-sm w-full mt-4">{/* skeleton */}</div>;
  }

  if (!currentRole) {
    return null;
  }

   if (!reservation || !reservation.hotel) {
    return <div className="mt-4">Booking information unavailable.</div>;
  }

  const { hotel, user: reservedUser } = reservation;

  const displayUser = currentRole === "USER" ? hotel.owner : reservedUser;

  const { 
    name, 
    avatar, 
    createdAt 
  } = displayUser ?? {};
  
  const avatarSrc = normalizeImageSrc(avatar);
  const finalAvatarSrc = avatarSrc || "/default-avatar.png";

  return (
    <div className="mt-4 flex items-center">
      <div className="rounded-full w-14 h-14 object-cover overflow-hidden bg-slate-400 flex items-center justify-center text-white font-bold flex-shrink-0">
        {finalAvatarSrc ? (
          <CustomImage
            src={finalAvatarSrc}
            alt={`Foto do Host ${name ?? "user"}`}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{name?.[0] ?? "U"}</span>
        )}
      </div>

      <div className="flex flex-col ml-3 justify-center">
        <b>Host: {name ?? "—"}</b>
        <span className="font-medium">
          Desde {createdAt ? new Date(createdAt).getFullYear() : "—"}
        </span>
      </div>
    </div>
  );
};

export default UserDetail;
