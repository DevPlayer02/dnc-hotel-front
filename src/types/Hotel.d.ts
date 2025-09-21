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