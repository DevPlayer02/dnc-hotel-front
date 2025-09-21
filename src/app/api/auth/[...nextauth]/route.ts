import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/api";
import { cookies } from "next/headers";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("no credentials!");

        const {
          data: { access_token },
        } = await axios.post<{ access_token: string }>("/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });

        const cookieStore = await cookies();
        cookieStore.set("access_token", access_token);

        const { sub: id } = JSON.parse(
          Buffer.from(access_token.split(".")[1], "base64").toString()
        );

        const { data: user } = await axios.get(`/users/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        return {
          ...user,
          access_token,
          image: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };