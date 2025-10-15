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
  lastReservation?: Reservation;
  createdAt: string;
  updatedAt: string;
};
