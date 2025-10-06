import axios from "@/api";
import { Hotel, HotelPagination } from "@/types/Hotel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function getHotels(
  page: number,
  limit: number
): Promise<HotelPagination> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) throw new Error("Access token not found in server session");

  const { data } = await axios.get("/hotels", {
    params: { page, limit },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data as HotelPagination;
}

export async function getHotelDetail(id: number): Promise<Hotel> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  const { data } = await axios.get(`/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data as Hotel;
}
