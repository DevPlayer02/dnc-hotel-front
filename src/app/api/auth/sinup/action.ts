"use server";

import { ActionResponse } from "@/types/api";
import axios from "@/api";
import { redirect } from "next/navigation";

export async function signup(prevState: ActionResponse | undefined, formData: FormData): Promise<ActionResponse>{
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const avatar = formData.get("avatar") as File | null;

  let access_token: string | undefined;

  try {
    const {
      data: { access_token: token },
    } = await axios.post<{ access_token: string }>("/auth/register", payload);
    access_token = token;
  } catch (error) {
    console.error("Registration error:", error);
    return { ...prevState, error: true, message: "Registration failed." };
  }

  if (avatar && avatar.size && access_token) {
    const formDataAvatar = new FormData();
    formDataAvatar.append("avatar", avatar);

    try {
      const uploadEndpoint = process.env.UPLOAD_API_ENDPOINT;
      if (!uploadEndpoint) {
        return {
          ...prevState,
          error: true,
          message: "Upload endpoint is not configured.",
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const uploadRes = await axios.post(uploadEndpoint, formDataAvatar, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      console.error("Avatar upload failed:", error);
      return {
        ...prevState,
        error: true,
        message: "Avatar upload failed after successful registration.",
      };
    }
  }

  redirect("/login");
}
