import { Hotel } from "./Hotel";
import { User } from "./User";

export type ReservationStatus = "PENDING" | "APPROVED" | "CANCELLED";

export type Reservation = {
    id: number;
    userId: number;
    hotelId: number;
    checkIn: string;
    checkOut: string;
    total: number;
    status: ReservationStatus;
    createdAt: string;
    updatedAt: string;
    user: User;
    hotel: Hotel
};