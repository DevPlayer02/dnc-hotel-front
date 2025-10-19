"use client";

import Link from "@/components/Link";
import { Reservation } from "@/types/Reservation";
import { useSession } from "next-auth/react";

type BackButtonProps = {
    reservation: Reservation;
    className?: string;
    textButton?: string;
};

const BackButton = ({ reservation, className, textButton }: BackButtonProps) => {
  const { data } = useSession();

  return (
    <Link
      href={
        data?.user?.role === "ADMIN"
          ? `/my-properties/${reservation.hotel.id}/reservations`
          : "/reservations"
      }
      className={className ?? "block w-full text-center mt-10"}
    >
      {textButton ?? "Back to my reservations"}
    </Link>
  );
};

export default BackButton;
