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
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = reservation.hotel.image;
  const srcUrl = filename
  ? `${base}/uploads-hotel/${encodeURIComponent(filename)}`
  : "/no-hotel.jpg";
  
  return (
    <Link
      href={`/reservations/${reservation.id}`}
      className="flex w-full mt-5 md:mt-0"
    >
      <CustomImage
        src={srcUrl}
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
