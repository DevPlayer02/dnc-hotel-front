import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/api";

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
          const { data: loginData } = await api.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const access_token = loginData?.access_token;
          if (!access_token) {
            console.error("No access_token in login response", loginData);
            return null;
          }

          const payload = JSON.parse(
            Buffer.from(access_token.split(".")[1], "base64").toString()
          );
          const userId = payload?.sub;

          const { data: user } = await api.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          return {
            ...user,
            access_token,
            image: user.avatar,
          };
        } catch (err) {
          console.error("authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
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
