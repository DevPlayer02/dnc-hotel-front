"use server";

import axios from "@/api";
import { Hotel, HotelPagination } from "@/types/Hotel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/action";
import { redirect } from "next/navigation";
import type { State } from "@/components/HotelForm";

export async function getHotels(
  page: number,
  limit: number
): Promise<HotelPagination> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })?.access_token;

  if (!accessToken) throw new Error("Access token not found in server session");

  const { data } = await axios.get("/hotels", {
    params: { page, limit },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data as HotelPagination;
}

export async function getHotelDetail(id: number): Promise<Hotel> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })?.access_token;

  const { data } = await axios.get(`/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data as Hotel;
}

export async function getHotelByOwner(): Promise<Hotel[]> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })?.access_token;

  const { data } = await axios.get("/hotels/owner", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data as Hotel[];
}

export async function createHotel(prevState: State | undefined, formData: FormData): Promise<State> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })?.access_token;

  try {
    const image = formData.get("image");
    const price = formData.get("price");

    let numericPrice = 0;
    if (typeof price === "string") {
      numericPrice = parseFloat(
        price
          .replace("U$", "")
          .replaceAll(/\s/g, "")
      );
    }

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: numericPrice,
      address: formData.get("address"),
    };

    const { data } = await axios.post("/hotels", payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const hotelId = (data as { id: number }).id;

    // Ensure image is a File before accessing size and appending
    if (image instanceof File && image.size) {
      const imageFormData = new FormData();
      imageFormData.append("image", image as File);

      await axios.patch(`/hotels/image/${hotelId}`, imageFormData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    console.log("Error:", error);
    return { ...(typeof prevState === "object" && prevState !== null ? prevState : {}), message: "", error: false };
  }

  redirect("/my-properties");
}

export async function getHotelById(id: number): Promise<Hotel> {
  const session = await getServerSession(authOptions);
const accessToken = (session?.user as { access_token?: string })?.access_token;

  const { data } = await axios.get(`/hotels/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data as Hotel;
}

export async function updateHotel(prevState: unknown, formData: FormData) {
  const session = await getServerSession(authOptions);
    const accessToken = (session?.user as { access_token?: string })?.access_token;

  try {
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;
    const id = formData.get("id") as string;

    let numericPrice = 0;
    if (typeof price === "string") {
      numericPrice = parseFloat(
        price
          .replace("U$", "")
          .replaceAll(/\s/g, "")
      );
    }

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: numericPrice,
      address: formData.get("address"),
    };
    
    const { data } = await axios.patch(`/hotels/${id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    const hotelId = (data as { id: number }).id;
    
    //Ensure image is a File before accessing size and appending
    if (image instanceof File && image.size) {
      const imageFormData = new FormData();
      imageFormData.append("image", image as File);
      
      await axios.patch(`/hotels/image/${hotelId}`, imageFormData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

  } catch (error) {
    console.log("Error:", error);
    return { ...(typeof prevState === "object" && prevState !== null ? prevState : {}), message: "It was not possible to register the hotel.", error: true };
  }
  
  redirect("/my-properties");
}