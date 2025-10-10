import { getReservationById } from "@/app/api/reservations/actions";
import DetailPage from "@/components/DetailPage";
import UserDetail from "@/components/UserDetail";
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
        children: <div>teste</div>,
      }}
    >
      <UserDetail user={reservation.hotel.owner} />
    </DetailPage>
  );
};

export default DetailsreservationPage;
