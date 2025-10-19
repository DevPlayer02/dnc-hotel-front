"use client";
import CustomImage from "../CustomImage";
import { normalizeImageSrc } from "@/helpers/format/image";
import { Reservation } from "@/types/Reservation";

type UserDetailProps = {
  reservation: Reservation;
};

const UserDetail = ({ reservation }: UserDetailProps) => {
  const rawAvatarSrc = reservation.user.avatar ?? "/default-avatar.png";
  const normalizedSrc = normalizeImageSrc(rawAvatarSrc);
  
  return (
    <div className="w-full p-4 border border-gray-200 shadow-lg rounded-xl mt-4 flex items-center">
      <CustomImage
        src={normalizedSrc}
        alt={`Host's photo ${reservation.user.name}`}
        width={56}
        height={56}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className="flex flex-col ml-2 justify-center">
        <b>Host: {reservation.user.name}</b>
        <span className="font-medium">
          Since {new Date(reservation.user.createdAt).getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default UserDetail;