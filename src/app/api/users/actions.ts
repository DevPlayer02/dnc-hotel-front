import axios from "@/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth/[...nextauth]/route";
import { decryptToken } from "@/helpers/decryptToken";
import { getReservationsByUser } from "../reservations/actions";
import { Reservation } from "@/types/Reservation";

export async function getProfile() {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) redirect("/login");

  const { id } = decryptToken(accessToken);

  const { data } = await axios.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const [reservation] = await getReservationsByUser();

  if (reservation) {
    return {...data as Reservation, lastReservation: reservation}
  }

  return data;
}
