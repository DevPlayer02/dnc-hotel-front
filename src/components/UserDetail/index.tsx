"use client";
import { Reservation } from "@/types/Reservation";
import { useSession } from "next-auth/react";
import CustomImage from "../CustomImage";
import { useEffect, useState } from "react";

type UserDetailProps = { reservation: Reservation };

const UserDetail = ({ reservation }: UserDetailProps) => {
  const [showUserDetail, setShowUserDetail] = useState(false);
  const { data } = useSession();
  const user =
    data?.user?.role === "USER" ? reservation.hotel.owner : reservation.user;

  useEffect(() => {
    if (data?.user.role) {
      setShowUserDetail(true);
    }
  }, [data?.user.role]);

  if (!showUserDetail) {
    return (
      <div className="max-w-sm w-full mt-4">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-300 h-14 w-14"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = reservation.user.avatar;
  const srcUrl = filename
    ? `${base}/uploads/${encodeURIComponent(filename)}`
    : "/no-hotel.jpg";

  return (
    <div className="mt-4 flex items-center">
      <div className="rounded-full w-14 h-14 object-cover overflow-hidden bg-slate-400 flex items-center justify-center text-white font-bold flex-shrink-0">
        <CustomImage
          src={srcUrl}
          alt={reservation.user.name}
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col ml-3 justify-center">
        <b>Host: {name ?? "—"}</b>
        <span className="font-medium">
          Desde{" "}
          {reservation.user.createdAt
            ? new Date(reservation.user.createdAt).getFullYear()
            : "—"}
        </span>
      </div>
    </div>
  );
};

export default UserDetail;
