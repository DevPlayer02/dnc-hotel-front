import { Reservation } from "@/types/Reservation";
import Link from "next/link";
import CustomImage from "../CustomImage";
import DetailRow from "./DetailRow";
import { getFormattedDate } from "@/helpers/format/date";
import { getFormattedStatus } from "@/helpers/format/dictionary/status";

type DetailListItemProps = {
  reservation: Reservation;
};

const DetailListItem = ({ reservation }: DetailListItemProps) => {    
  
    if (!reservation) {
    console.warn("[DetailListItem] missing reservation prop");
    return null; // ou return <div>No reservation</div>;
  }

  // Warn se hotel estiver faltando — ajuda a identificar falha na API
  if (!reservation.hotel) {
    console.warn("[DetailListItem] reservation.hotel is missing", { reservationId: reservation.id, reservation });
    // opcional: você pode mostrar um fallback visual em vez de null
    return (
      <Link href={`/reservations/${reservation.id}`} className="flex w-full mt-5 md:mt-0">
        <div className="rounded-lg w-32 h-32 bg-gray-100 flex items-center justify-center">No hotel data</div>
        <div className="w-full flex flex-col justify-around ml-4">
          <b>—</b>
          <div>
            <DetailRow title="Status:" description={getFormattedStatus(reservation.status)} className="mb-1" />
            <DetailRow title="Check-in:" description={getFormattedDate(reservation.checkIn)} className="mb-1" />
            <DetailRow title="Check-out:" description={getFormattedDate(reservation.checkOut)} className="mb-1" />
          </div>
        </div>
      </Link>
    );
  }
  
  
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = reservation.hotel.image;
  const srcUrl = filename
  ? `${base}/uploads-hotel/${encodeURIComponent(filename)}`
  : "/no-hotel.jpg";
  
  if (!reservation) return null;
  
  return (
    <Link
      href={`/reservations/${reservation.id}`}
      className="flex w-full mt-5 md:mt-0"
    >
      <CustomImage
        src={srcUrl ?? "/no-hotel.jpg"}
        alt={`Hotel's photo ${reservation.hotel.name}`}
        width={300}
        height={300}
        className="rounded-lg w-32 h-32 object-cover"
      />
      <div className="w-full flex flex-col justify-around ml-4">
        <b>{reservation.hotel.name}</b>
        <div>
          <DetailRow
            title="Status:"
            description={getFormattedStatus(reservation.status)}
            className="mb-1"
          />
          <DetailRow
            title="Check-in:"
            description={getFormattedDate(reservation.checkIn)}
            className="mb-1"
          />
          <DetailRow
            title="Check-out:"
            description={getFormattedDate(reservation.checkOut)}
            className="mb-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default DetailListItem;
