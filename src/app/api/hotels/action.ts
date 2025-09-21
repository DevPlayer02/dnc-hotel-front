import axios from "@/api";
import { HotelPagination } from "@/types/Hotel";
import { cookies } from "next/headers";

export async function getHotels(page: number, limit: number): Promise<HotelPagination> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const { data } = await axios.get("/hotels", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data as HotelPagination;
}
