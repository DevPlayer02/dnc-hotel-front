import { getServerSession } from "next-auth";
import { getReservationsByUser } from "../api/reservations/actions";
import { redirect } from "next/navigation";
import DetailListItem from "@/components/DetailListItem";
import Link from "@/components/Link";

const ReservationsPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservations = await getReservationsByUser();
  console.log({ reservations });
  return (
    <div className="py-10">
      <Link href="/perfil" className="my-6">
        Back
      </Link>
      <h1 className="font-bold text-4xl">My Stays</h1>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {reservations.map((reservation) => (
          <DetailListItem reservation={reservation} key={reservation.id} />
        ))}
      </section>
    </div>
  );
};

export default ReservationsPage;
