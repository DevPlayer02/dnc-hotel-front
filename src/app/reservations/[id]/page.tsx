import { getReservationById } from "@/app/api/reservations/actions";
import DetailRow from "@/components/DetailListItem/DetailRow";
import DetailPage from "@/components/DetailPage";
import Link from "@/components/Link";
import UserDetail from "@/components/UserDetail/server";
import { getFormattedStatus } from "@/helpers/format/dictionary/status";
import { getFormattedDate } from "@/helpers/format/date";
import { getFormattedPrice } from "@/helpers/format/money";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DetailsreservationPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservationId = Number(params.id);
  const reservation = await getReservationById(reservationId);
  console.log({ reservation });

  return (
    <DetailPage
      title={`Your reservation at ${reservation.hotel.name}`}
      image={{
        src: reservation.hotel.image ?? "/no-hotel.jpg",
        alt: `Photo of the ${reservation.hotel.name}`,
      }}
      previousPage="/reservations"
      asideContainer={{
        title: "Reservation Info",
        children: (
          <div>
            <DetailRow
              title="Status"
              description={getFormattedStatus(reservation.status)}
              className="mt-6"
            />
            <DetailRow
              title="Confirmation code"
              description={`${reservation.id}`}
              className="mt-2"
            />
            <DetailRow
              title="Total"
              description={`U$ ${getFormattedPrice(Math.abs(reservation.total))}`}
              className="mt-2"
            />
            <DetailRow
              title="Check-in"
              description={getFormattedDate(reservation.checkIn)}
              className="mt-2"
            />
            <DetailRow
              title="Check-out"
              description={getFormattedDate(reservation.checkOut)}
              className="mt-2"
            />
            <Link href="/reservations" className="block w-full text-center mt-10">Back to my stays</Link>
          </div>
        ),
      }}
    >
      <UserDetail user={reservation.hotel.owner} />
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl mt-4">Address</h3>
        <span className="mt-2">{reservation.hotel.address}</span>
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl mt-4">About this space</h3>
        <span className="mt-2">{reservation.hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default DetailsreservationPage;
