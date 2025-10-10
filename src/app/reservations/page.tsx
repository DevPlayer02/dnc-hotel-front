import { getServerSession } from "next-auth";
import { getReservationsByUser } from "../api/reservations/actions";
import { redirect } from "next/navigation";
import DetailListItem from "@/components/DetailListItem";
import Link from "@/components/Link";
import { STATUS } from "@/helpers/dictionary/status";
import { Reservation } from "@/types/Reservation";

type ReducedReservations = {
  pending: Reservation[];
  approved: Reservation[];
  cancelled: Reservation[];
}

const ReservationsPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservations = await getReservationsByUser();

  const { pending, approved, cancelled } = reservations.reduce<ReducedReservations>((prev, current) => {
    if (current.status === STATUS.PENDING) {
      return { ...prev, pending: [...prev.pending, current] };
    } else if (current.status === STATUS.APPROVED) {
      return { ...prev, approved: [...prev.approved, current] };
    } else if (current.status === STATUS.CANCELLED) { 
      return { ...prev, cancelled: [...prev.cancelled, current] };
    } else {
      return prev;
    }
  }, { pending: [], approved: [], cancelled: [] });

  return (
    <div className="py-10">
      <Link href="/perfil" className="my-6">
        Back
      </Link>
      <h1 className="font-bold text-4xl">My Stays</h1>
      <span className="flex text-2xl font-bold mt-12">Upcoming Reservations</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {pending.map((reservation) => (
          <DetailListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-8">Past Reservations</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {approved.map((reservation) => (
          <DetailListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-8">Cancelled Reservations</span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4 mb-10">
        {cancelled.map((reservation) => (
          <DetailListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
    </div>
  );
};

export default ReservationsPage;
