"use server";

import axios from "@/api";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/action";
import { Reservation, ReservationStatus } from "@/types/Reservation";
import { getHotelDetail } from "../hotels/action";
import { Hotel } from "@/types/Hotel";

export async function reserveHotelById(prevState: unknown, formData: FormData) {
  let reservationId;
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })?.access_token;

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
    const responseData = data as { id: number };
    reservationId = responseData.id;
  } catch (error) {
    console.log({error})
    return {
      ...(typeof prevState === "object" && prevState !== null ? prevState : {}),
      message: "Failed to create reservation",
      error: true,
    };
  }
  redirect(`/reservations/${reservationId}/success`);
}

export async function getReservationById(id: number): Promise<Reservation> {
  const session = await getServerSession(authOptions);
const accessToken = (session?.user as { access_token?: string })?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const reservationData = data as Reservation;
  const hotel = await getHotelDetail(reservationData.hotelId);

  return { ...reservationData, hotel};
}

export async function getReservationsByUser(): Promise<Reservation[]> { 
  const session = await getServerSession(authOptions);
const accessToken = (session?.user as { access_token?: string })?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.get("/reservations/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const reservationsData = data as Reservation[];
  if (reservationsData.length) {
    const reservations = await Promise.all(reservationsData.map(async (reservation: Reservation) => {
      const hotel = await getHotelDetail(reservation.hotelId);
      return { ...reservation, hotel };
    }));

    return reservations;
  }

  return reservationsData;
}

export async function getReservationsByHotel(hotel: Hotel): Promise<Reservation[]> { 
  const session = await getServerSession(authOptions);
const accessToken = (session?.user as { access_token?: string })?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.get(`/reservations/hotel/${hotel.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const reservationsData = data as Reservation[];
  if (reservationsData.length) {
    const reservations = reservationsData.map((reservation: Reservation) => {
      return { ...reservation, hotel };
    });

    return reservations;
  }

  return reservationsData;
}

export async function updateReservationStatus(reservationId: number, status: ReservationStatus) {
  const session = await getServerSession(authOptions);
const accessToken = (session?.user as { access_token?: string })?.access_token;

  if (!accessToken) redirect("/login");

  const { data } = await axios.patch(`/reservations/${reservationId}`, { status }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data;
}