import Link from "next/link";
import CustomImage from "../CustomImage";
import DetailRow from "../DetailListItem/DetailRow";
import { Hotel } from "@/types/Hotel";
import { getFormattedPrice } from "@/helpers/format/money";

type HotelListItemProps = {
  hotel: Hotel;
  className?: string;
};

const HotelListItem = ({ hotel, className }: HotelListItemProps) => {    
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = hotel.image;
  const srcUrl = filename
  ? `${base}/uploads-hotel/${encodeURIComponent(filename)}`
  : "/no-hotel.jpg";
    
  return (
    <Link
      href={`/my-properties/${hotel.id}/reservations`}
      className={`flex w-full mt-5 md:mt-0 ${className}`}
    >
      <CustomImage
        src={srcUrl ?? "/no-hotel.jpg"}
        alt={`Hotel's photo ${hotel.name}`}
        width={300}
        height={300}
        className="border border-black shadow-2xl rounded-lg w-32 h-32 object-cover "
      />
      <div className="w-full flex flex-col justify-around ml-4">
        <b>{hotel.name}</b>
        <div>
          <DetailRow
            title="Address:"
            description={hotel.address}
            className="mb-1"
          />
          <DetailRow
            title="Price:"
            description={`U$ ${getFormattedPrice(hotel.price)}`}
            className="mb-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default HotelListItem;
