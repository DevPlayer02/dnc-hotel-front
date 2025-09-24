import { getHotelDetail } from "@/app/api/hotels/action";
import DetailPage from "@/components/DetailPage";
import { getFormattedPrice } from "@/helpers/format/money";
import Image from "next/image";
import HotelBookingForm from "./HotelBookingForm";

type Params = {
  id: string;
};

type HotelDetailProps = {
  params: Params;
};

const HotelDetail = async ({ params }: HotelDetailProps) => {
  const { id } = await params;
  const hotel = await getHotelDetail(Number(id));
  console.log({ hotel });
  return (
    <DetailPage
      previousPage="/"
      title={hotel.name}
      image={{
        src: hotel.image ?? "/no-hotel.jpg",
        alt: `Image of ${hotel.name}`,
      }}
      asideContainer={{
        title: <>U$ {getFormattedPrice(hotel.price)}&nbsp;per night</>,
        children: <HotelBookingForm  hotel={hotel}/>,
      }}
    >
      <div className="mt-4 flex">
        <Image
          src={hotel.owner.avatar ?? "/default-profile.jpg"}
          alt={`${hotel.owner.name}'s Photo`}
          width={56}
          height={56}
          className="rounded-full w-14 h-14 object-cover"
        />
        <div className="flex flex-col ml-2 justify-center">
          <b>Host: {hotel.owner.name}</b>
          <span className="font-medium">
            Since {new Date(hotel.createdAt).getFullYear()}
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <hr className="mb-4" />
        <h3 className="font-bold text-2xl">Address</h3>
        <span className="mt-4">{hotel.address}</span>
      </div>
      <div className="mt-4 flex flex-col">
        <hr className="mb-4" />
        <h3 className="font-bold text-2xl">About this space</h3>
        <span className="mt-2">{hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default HotelDetail;