import { getReservationById } from "@/app/api/reservations/actions";
import Link from "@/components/Link";
import UserDetail from "@/components/UserDetail/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type DetailsProps = {
  params?: Promise<{ id: string }>;
};

const ReservationRequestPage = async ({ params }: DetailsProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const resolvedParams = params ? await params : undefined;
  const idStr = resolvedParams?.id;

  if (!idStr) {
    return <div>ID invalid or not found</div>;
  }

  const reservationId = Number(idStr);
  const reservation = await getReservationById(reservationId);
  const { hotel } = reservation;

  return (
    <div className="flex flex-col w-full max-w-lg my-24 px-8">
      <section>
        <Link href="/reservations"> Back </Link>
      </section>
      <section className="flex mt-2 flex-col">
        <article className="w-full">
          <h1 className="font-bold text-4xl">
            Your reservation request for {hotel.name} has been sent!
          </h1>
          <UserDetail user={hotel.owner} />
          <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl mt-4">
              We&apos;ve sent your reservation request to the host!
            </h3>
            <span className="mt-2">
              Your reservation request for {hotel.name} is currently pending
              host approval. You will receive an update on your request shortly.
            </span>
          </div>
          <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl mt-4">Address</h3>
            <span className="mt-2">{hotel.address}</span>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ReservationRequestPage;
