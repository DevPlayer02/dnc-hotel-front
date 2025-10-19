"use client";

import CustomImage from "@/components/CustomImage";
import { Reservation, ReservationStatus } from "@/types/Reservation";
import DetailRow from "../DetailRow";
import { getFormattedPrice } from "@/helpers/format/money";
import Button from "@/components/Button";
import { getFormattedDetailDate } from "@/helpers/format/date";
import { updateReservationStatus } from "@/app/api/reservations/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ReservationOwnerListItemProps = {
  reservation: Reservation;
};

const ReservationOwnerListItem = ({
  reservation,
}: ReservationOwnerListItemProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = reservation?.user?.avatar;
  const srcUrl = filename
    ? `${base}/uploads/${encodeURIComponent(filename)}`
    : "/default-profile.jpg";

  const handleReservationStatus = async (status: ReservationStatus) => {
    setLoading(true);

    try {
      await updateReservationStatus(reservation.id, status);
      await router.push(`/reservations/${reservation.id}`);
    } catch (error) {
      console.error("Error updating reservation status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full mt-5 md:mt-0">
      <div className="max-w-32 h-32">
        <CustomImage
          src={srcUrl}
          alt={`User photo of ${reservation?.user?.name}`}
          width={500}
          height={500}
          className="rounded-lg h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col justify-between ml-4">
        <DetailRow title="Requester" description={reservation?.user?.name} />
        <DetailRow
          title="Total"
          description={`U$ ${getFormattedPrice(Math.abs(reservation.total))}`}
        />
        <div className="my-1">
          <span>{`${getFormattedDetailDate(
            reservation.checkIn
          )} - ${getFormattedDetailDate(reservation.checkOut)}`}</span>
        </div>
        {reservation.status === "PENDING" && (
          <div className="flex">
            <Button
              disabled={loading}
              onClick={() =>
                void handleReservationStatus("APPROVED" as ReservationStatus)
              }
            >
              Approve
            </Button>
            <Button
              disabled={loading}
              onClick={() =>
                void handleReservationStatus("CANCELLED" as ReservationStatus)
              }
              appearance="secondary"
            >
              Deny
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationOwnerListItem;
