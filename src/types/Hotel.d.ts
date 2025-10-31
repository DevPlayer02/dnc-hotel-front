import { User } from "./User";

export type Hotel = {
    id: number;
    name: string;
    description: string;
    address: string;
    image: string | null;
    price: number;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
    owner: User;
}

export type HotelPagination = {
    total: number;
    page: number;
    per_page: number;
    limit: number;
    data: Hotel[];
}