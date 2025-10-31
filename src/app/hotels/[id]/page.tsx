import { getHotelDetail } from "@/app/api/hotels/action";
import DetailPage from "@/components/DetailPage";
import { getFormattedPrice } from "@/helpers/format/money";
import HotelBookingForm from "./HotelBookingForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserDetail from "@/components/UserDetail/server";

type ParamsProps = Promise<{ id: string }>;

const HotelDetail = async ({ params }: { params: ParamsProps}) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const hotelId = Number(id);
  const hotel = await getHotelDetail(Number(hotelId));

  return (
    <DetailPage
      backButton=""
      title={hotel.name}
      image={{
        src: hotel.image ?? "/no-hotel.jpg",
        alt: `Image of ${hotel.name}`
      }}
      asideContainer={{
        title: <>U$ {getFormattedPrice(hotel.price)}&nbsp;per night</>,
        children: <HotelBookingForm  hotel={hotel}/>,
      }}
      className="max-w-screen-2xl mx-auto" 
    >
      <UserDetail user={hotel.owner} />
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl mt-4">Address</h3>
        <span className="mt-2">{hotel.address}</span>
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl mt-4">About this space</h3>
        <span className="mt-2">{hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default HotelDetail;