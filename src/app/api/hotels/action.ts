"use server";
import axios from "@/api";
import { authOptions } from "@/lib/authOptions";
import { Hotel, HotelPagination } from "@/types/Hotel";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface FormState {
  message?: string;
  success?: boolean;
  result?: Promise<FormState>;
}

export async function getHotels(
  page: number,
  limit: number
): Promise<HotelPagination> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })
    ?.access_token;

  const { data } = await axios.get("/hotels", {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data as HotelPagination;
}

export async function getHotelDetail(id: number): Promise<Hotel> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })
    ?.access_token;

  const { data } = await axios.get(`/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data as Hotel;
}

export async function getHotelByOwner(): Promise<Hotel[]> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })
    ?.access_token;

  const { data } = await axios.get("/hotels/owner", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data as Hotel[];
}

export async function getHotelById(id: number): Promise<Hotel> {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })
    ?.access_token;

  const { data } = await axios.get(`/hotels/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data as Hotel;
}

export async function createHotel(prevState: FormState, formData: FormData) {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })
    ?.access_token;
  if (!accessToken) redirect("/login");

  try {
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(
        price
          .replaceAll("U$", "")
          .replaceAll(/\s/g, "")
      ),
      address: formData.get("address"),
    };

    const { data } = await axios.post("/hotels", payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const hotelId = (data as Hotel).id;

    if (image?.size) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      await axios.patch(`/hotels/image/${hotelId}`, imageFormData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }


  } catch (error) {
    console.log("tratar erro: ", error);
    return {
      ...prevState,
      message: "Unable to register the hotel.",
      error: true,
    };
  }

  redirect("/my-properties");
}

export async function updateHotel(prevState: FormState, formData: FormData) {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { access_token?: string })
    ?.access_token;
  if (!accessToken) redirect("/login");

  try {
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;
    const id = formData.get("id") as string;

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(
        price
          .replaceAll("U$", "")
          .replaceAll(/\s/g, "")
      ),
      address: formData.get("address"),
    };

    const { data } = await axios.patch(`/hotels/${id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const hotelId = (data as Hotel).id;

    if (image?.size) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      await axios.patch(`/hotels/image/${hotelId}`, imageFormData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    console.log("tratar erro: ", error);
    return {
      ...prevState,
      message: "Unable to register the hotel.",
      error: true,
    };
  }

  redirect("/my-properties");
}
