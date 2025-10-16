import { Reservation } from "./Reservation";

export type Role = "ADMIN" | "USER";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  password?: string;
  avatar: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = User & {
  lastReservation?: Reservation;
  hotels?: Hotel[]
}