"use server";

import axios from "@/api";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Reservation, ReservationStatus } from "@/types/Reservation";
import { getHotelDetail } from "../hotels/action";
import { Hotel } from "@/types/Hotel";

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

export async function getReservationsByUser(): Promise<Reservation[]> { 
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.get("/reservations/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (data.lenght) {
    const reservations = await Promise.all(data.map(async (reservation: Reservation) => {
      const hotel = await getHotelDetail(reservation.hotelId);
      return { ...reservation, hotel };
    }));

    return reservations;
  }

  return data as Reservation[];
}

export async function getReservationsByHotel(hotel: Hotel): Promise<Reservation[]> { 
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/reservations/hotel/${hotel.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (data.lenght) {
    const reservations = data.map((reservation: Reservation) => {
      return { ...reservation, hotel };
    });

    return reservations;
  }

  return data as Reservation[];
}

export async function updateReservationStatus(reservationId: number, status: ReservationStatus) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.patch(`/reservations/${reservationId}`, { status }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data;
}