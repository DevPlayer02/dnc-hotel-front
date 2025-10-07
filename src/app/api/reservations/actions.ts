"use server";

import axios from "@/api";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Reservation } from "@/types/Reservation";
import { getHotelDetail } from "../hotels/action";

export async function reserveHotelById(prevState: any, formData: FormData) {
  let reservationId;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) redirect("/login");

  try {
    const payload = {
      hotelId: Number(formData.get("hotelId")),
      checkIn: formData.get("checkIn"),
      checkOut: formData.get("checkOut"),
    };

    const { data } = await axios.post("/reservations", payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    reservationId = data.id;
  } catch (error) {
    console.log({error})
    return {
      ...prevState,
      message: "Failed to create reservation",
      error: true,
    };
  }
  redirect(`/reservations/${reservationId}/success`);
}

export async function getReservationById(id: number): Promise<Reservation> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const hotel = await getHotelDetail(data.hotelId);

  return { ...data, hotel};
}
