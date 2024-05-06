import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import clientPromise from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: MongoDBAdapter(clientPromise),
   ...authConfig,
   session: {
      strategy: "jwt",
   },
   pages: {
      signIn: "/auth/signin",

      error: "/auth/error",
   },

   callbacks: {
      async jwt({ token, user }) {
         return token;
      },
      async session({ session, token, user }) {
         if (token.sub && session.user) {
            session.user.id = token.sub;
         }
         return session;
      },
   },
});
