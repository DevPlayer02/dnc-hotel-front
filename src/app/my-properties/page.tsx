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
      <div className="p-10 px-20 mt-6 border border-snow-white rounded-4xl bg-blue-500">
        <section className="flex justify-end mb-10">
          <Link href="/my-properties/register">
            <Button appearance="secondary"> + New properties </Button>
          </Link>
        </section>
        <section className="grid grid-cols-1 md:gap-20 sm:grid-cols-2 mt-0">
          {hotels.map((hotel) => (
            <HotelListItem hotel={hotel} key={hotel.id} className="shadow-2xl border border-white bg-snow-white rounded-lg p-4"/>
          ))}
        </section>
      </div>
    </div>
  );
}
