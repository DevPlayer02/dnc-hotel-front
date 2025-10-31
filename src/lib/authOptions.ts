import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/api";
import { Role } from "@/types/User";
import { JWT } from "next-auth/jwt";

type LoginResponse = {
  access_token: string;
};

type UserResponse = {
  id: number | string;
  name?: string;
  email?: string;
  avatar?: string | null;
  role?: Role;
};

type Token = JWT & {
  id?: string;
  access_token?: string;
  name?: string;
  email?: string;
  image?: string | null;
  role?: Role;
  avatar?: string | null;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        try {
          const { data: loginData } = await api.post<LoginResponse>(
            "/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const access_token = loginData?.access_token;
          if (!access_token) {
            console.error("No access_token in login response", loginData);
            return null;
          }

          const payload = JSON.parse(
            Buffer.from(access_token.split(".")[1], "base64").toString()
          );
          const userId = payload?.sub;

          const { data: user } = await api.get<UserResponse>(
            `/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          );

          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            access_token,
            image: user.avatar ?? null,
            role: user.role,
          };
        } catch (err) {
          console.error("authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }): Promise<Token> {
      if (user) {
        const AuthUser = user as unknown as Token;
        return { ...(token as Token), ...AuthUser };
      }
      return token as Token;
    },

    async session({ session, token }): Promise<Session> {
      const UserToken = token as Token;
      session.user = {
        id: UserToken.id ?? session.user?.id,
        name: UserToken.name,
        email: UserToken.email,
        image: UserToken.image,
        role: UserToken.role,
        access_token: UserToken.access_token,
        avatar: UserToken.avatar,
      } as unknown as Session["user"];

      return session;
    },
  },

  pages: { signIn: "/login" },
};
