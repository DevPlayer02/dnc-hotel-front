"use server"

import axios from "@/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/authOptions";
import { decryptToken } from "@/helpers/decryptToken";
import { getReservationsByUser } from "../reservations/actions";
import { ActionResponse } from "@/types/api";
import { User } from "@/types/User";
import { getHotelByOwner } from "../hotels/action";

export async function getProfile(): Promise<User> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })?.access_token;

  if (!accessToken) redirect("/login");

  const { id } = decryptToken(accessToken);

  const { data } = await axios.get<User>(`/users/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (data.role === 'ADMIN') {
    const hotels = await getHotelByOwner();

    if (hotels) {
      return { ...data, hotels}
    }

    return data;
  } else {
    const [reservation] = await getReservationsByUser();
  
    if (reservation) {
      return { ...(data), lastReservation: reservation };
    }
  
    return data;
  }

}

export async function updateProfile(prevState: ActionResponse | undefined, formData: FormData): Promise<ActionResponse>  {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })?.access_token;

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
