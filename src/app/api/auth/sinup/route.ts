"use server";

import axios from "@/api";
import { redirect } from "next/navigation";

export async function signup(prevState: Record<string, unknown>, formData: FormData) {
  try {
    const avatar = formData.get("avatar") as File;
    const formDataAvatar = new FormData();
    formDataAvatar.set("avatar", avatar);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const {
      data: { access_token },
    } = await axios.post<{ access_token: string }>("/auth/register", payload);

    if (avatar.size) {
      await axios.post("/users/avatar", formDataAvatar, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
  } catch (error) {
    console.log("Error: ", error)

    return { ...prevState, error: true, message: 'Registration failed.' };
  }

  redirect("/login");
}
