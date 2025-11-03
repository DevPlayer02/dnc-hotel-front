import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getHotels } from "./api/hotels/action";
import { getFormattedPrice } from "@/helpers/format/money";
import Pagination from "@/components/Pagination";
import CustomImage from "@/components/CustomImage";
import { Hotel, HotelPagination } from "@/types/Hotel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home(props: any) {
  const { searchParams } = props ?? {};

  const resolvedSearchParams = (await Promise.resolve(
    searchParams ?? {}
  )) as Record<string, string | string[] | undefined>;

  const pageParam = resolvedSearchParams.page;
  const currentPage = Number(pageParam ?? 1);

  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const result = (await getHotels(currentPage, 8)) as HotelPagination;

  const hotels: Hotel[] = result?.data ?? [];
  const { per_page, total } = result;
  const totalPages = Math.max(1, Math.ceil(total / per_page));

  return (
    <div>
      <section className="grid grid-cols-1 gap-2 px-5 sm:grid-cols-2 sm:px-10 md:grid-cols-3 lg:grid-cols-4 mt-20 mb-20">
        {hotels.map((hotel) => {
          const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
            /\/$/,
            ""
          );
          const filename = hotel?.image;
          const srcUrl = filename
            ? `${base}/uploads-hotel/${encodeURIComponent(filename)}`
            : "/default-profile.jpg";

          return (
            <Link
              href={`/hotels/${hotel.id}`}
              key={hotel.id}
              className="p-6 m-4 bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow "
            >
              <div className="flex flex-col">
                <div className="w-auto h-auto">
                  <CustomImage
                    src={srcUrl}
                    uploadsPath="/uploads-hotel"
                    width={220}
                    height={200}
                    alt={`Hotel image ${hotel.name}`}
                    className="object-cover rounded-3xl h-48"
                  />
                </div>
                <div className="flex flex-col mt-4 ml-2">
                  <h3 className="font-bold mt-0">{hotel.name}</h3>
                  <span className="mt-2">
                    <b>Host:</b> {hotel.owner.name}
                  </span>
                  <span className="mt-2">
                    <b>U$ {getFormattedPrice(hotel.price)}</b> / dairy
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
      <section className="flex justify-center mt-4 mb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          destination="/"
        />
      </section>
    </div>
  );
}
