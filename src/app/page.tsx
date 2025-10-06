import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getHotels } from "./api/hotels/action";
import { getFormattedPrice } from "@/helpers/format/money";
import Pagination from "@/components/Pagination";
import CustomImage from "@/components/CustomImage";

type SearchParams = {
  page: string;
  query: string;
};

type HomeProps = {
  searchParams: SearchParams;
};

const LIMIT = 8;

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const sp = await searchParams;
  const rawPage = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const currentPage = Number(rawPage ?? 1);

  const { data: hotels, per_page, page, total } = await getHotels(currentPage, LIMIT);

  return (
    <div>
      <section className="grid grid-cols-1 gap-2 px-5 sm:grid-cols-2 sm:px-10 md:grid-cols-3 lg:grid-cols-4 mt-20 mb-20">
        {hotels.map((hotel) => (
          <Link
            href={`/hotels/${hotel.id}`}
            key={hotel.id}
            className="p-6 m-4 bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow "
          >
            <article className="flex flex-col">
              <div className="w-64 h-48">
                <CustomImage
                  src={hotel.image}
                  uploadsPath="/uploads-hotel"
                  width={250}
                  height={250}
                  alt={`Hotel image ${hotel.name}`}
                  className="object-cover rounded-3xl h-48"
                />
              </div>
              <div className="flex flex-col mt-4 ml-2">
                <h3 className="font-bold mt-0">{hotel.name}</h3>
                <span className="mt-2"> <b>Host:</b> {hotel.owner.name} </span>
                <span className="mt-2">
                  <b>U$ {getFormattedPrice(hotel.price)}</b> night
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>
      <section className="flex justify-center mt-4 mb-8">
        <Pagination totalPages={Math.ceil(total / per_page)} currentPage={currentPage} destination="/"/>
      </section>
    </div>
  );
}
