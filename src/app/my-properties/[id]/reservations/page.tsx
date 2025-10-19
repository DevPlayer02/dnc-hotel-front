import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "@/components/Link";
import { STATUS } from "@/helpers/format/dictionary/status";
import { Reservation } from "@/types/Reservation";
import {
  getReservationsByHotel,
} from "@/app/api/reservations/actions";
import { DetailPageProps } from "@/types/DetailPage";
import { getHotelById } from "@/app/api/hotels/action";
import ReservationOwnerListItem from "@/components/DetailListItem/Owner";

type ReducedReservations = {
  pending: Reservation[];
  approved: Reservation[];
  cancelled: Reservation[];
};

const ReservationsPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const hotelId = Number(id);
  const hotel = await getHotelById(hotelId);
  const reservations = await getReservationsByHotel(hotel);

  const { pending, approved, cancelled } =
    reservations.reduce<ReducedReservations>(
      (prev, current) => {
        if (current.status === STATUS.PENDING) {
          return { ...prev, pending: [...prev.pending, current] };
        } else if (current.status === STATUS.APPROVED) {
          return { ...prev, approved: [...prev.approved, current] };
        } else if (current.status === STATUS.CANCELLED) {
          return { ...prev, cancelled: [...prev.cancelled, current] };
        } else {
          return prev;
        }
      },
      { pending: [], approved: [], cancelled: [] }
    );

  return (
    <div className="px-20 py-20">
      <div className=" flex justify-between my-10">
        <Link href="/my-properties" className="my-6">
          Back
        </Link>
        <Link href={`/my-properties/${hotel.id}/edit`} className="my-6">
          Edit property
        </Link>
      </div>
      <h1 className="font-bold text-4xl">{hotel.name}</h1>
      <span className="flex text-2xl font-bold mt-12">
        Reservation requests
      </span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {pending.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-8">
        Approved reservations
      </span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {approved.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-8">
        Cancelled reservations
      </span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4 mb-10">
        {cancelled.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
    </div>
  );
};

export default ReservationsPage;
