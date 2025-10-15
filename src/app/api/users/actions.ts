"use server"

import axios from "@/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth/[...nextauth]/route";
import { decryptToken } from "@/helpers/decryptToken";
import { getReservationsByUser } from "../reservations/actions";
import { Reservation } from "@/types/Reservation";
import { User } from "@/types/User";

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
    return { ...(data as Reservation), lastReservation: reservation };
  }

  return data;
}

export async function updateProfile(prevState: any ,formData: FormData): Promise<User> {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.access_token;

  if (!accessToken) redirect("/login");

  try {
    const avatar = formData.get("avatar") as File;

    const { id } = decryptToken(accessToken);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    axios.patch(`/users/${id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (avatar.size) {
      const formDataAvatar = new FormData();
      formDataAvatar.set("avatar", avatar);

      await axios.post("/users/avatar", formDataAvatar, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } catch (error) {
    console.log("Error:", error);
  }

  redirect("/profile");
}
