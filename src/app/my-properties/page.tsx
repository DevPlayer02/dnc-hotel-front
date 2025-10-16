import { getServerSession } from "next-auth";
import Link from "@/components/Link";
import { redirect } from "next/navigation";
import { getHotelByOwner } from "../api/hotels/action";
import HotelListItem from "@/components/HotelListItem";
import Button from "@/components/Button";

export default async function MyProperties() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const hotels = await getHotelByOwner();

  return (
    <div className="py-20">
      <section className="w-full my-4">
        <Link href="/profile"> Back </Link>
      </section>
      <div className="p-10 px-40 mt-6 border border-snow-white rounded-4xl bg-snow-white">
        <section className="flex justify-center mb-10">
          <Link href="/my-propierties/register">
            <Button> + New properties </Button>
          </Link>
        </section>
        <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 mt-4">
          {hotels.map((hotel) => (
            <HotelListItem hotel={hotel} key={hotel.id} />
          ))}
        </section>
      </div>
    </div>
  );
}
