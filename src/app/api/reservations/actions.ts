"use server"

import axios from "@/api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function reserveHotelById(prevState:any , formData: FormData) { 
    let reservationId;
    const cookieStore = cookies()
    const accessToken = (await cookieStore).get("access_token")?.value
    
    if (!accessToken) redirect("/login")
    
    try {
        const payload = {
            hotelId: formData.get("hotelId"),
            checkIn: formData.get("checkIn"),
            checkOut: formData.get("checkOut"),
        }
    
        const { data } = await axios.post("/reservations", payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        reservationId = data.id;
    } catch (e) {
        return { ...prevState, error: "Failed to create reservation", e: true }
    }
    redirect(`/reservations/${reservationId}/sucesso`)

}