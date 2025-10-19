import { getHotelById } from "@/app/api/hotels/action";
import HotelForm from "@/components/HotelForm";
import Link from "@/components/Link";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const EditHotelPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const hotelId = Number(id);
  const hotel = await getHotelById(hotelId);

  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span className="mb-4"> Edit property </span>
      <HotelForm hotel={hotel} />
      <Link href="/my-properties" className="mt-3 text-red-500">
        Cancel
      </Link>
    </section>
  );
};

export default EditHotelPage;
