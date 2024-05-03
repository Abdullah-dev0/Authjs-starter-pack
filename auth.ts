import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
         // e.g. domain, username, password, 2FA token, etc.
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            let user = {
               id: 1,
               name: "John Doe",
            };
            console.log("credentials", credentials.email, credentials.password);
            return user;
         },
      }),
   ],
});
