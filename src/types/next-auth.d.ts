import { Role } from "./User";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: Role;
      avatar: string | null;
      image: string | null;
      createdAt: string;
      password: string;
    };
  }

  interface User {
    id: string;
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    id?: string;
    role?: Role;
    avatar?: string | null;
  }
}
