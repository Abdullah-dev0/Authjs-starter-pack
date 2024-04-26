import NextAuth from "next-auth";
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
            let user = null;
            // user = await getUserFromDb(credentials.email, credentials.password);

            if (!user) {
               throw new Error("User not found.");
            }

            // return user object with the their profile data
            return user;
         },
      }),
   ],
});
