"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schema";
import { AuthError } from "next-auth";
import { z } from "zod";
import { generateVerificationToken } from "./tokens";

export const login = async (values: z.infer<typeof loginSchema>) => {
   const validatedvalues = loginSchema.safeParse(values);

   if (!validatedvalues.success) {
      return { error: "invalid fields" };
   }

   // Destructure email and password from validatedvalues

   const { email, password } = validatedvalues.data;

   // we write a logic of checking if the user exists in the database and if not we return an error and if it does but the email is not verified we generate a verification token and return a success message.

   const user = await getUserByEmail(email);

   if (!user || !user.password || !user.email) {
      return { error: "email Does not exist" };
   }

   if (!user.emailVerified) {
      await generateVerificationToken(email);

      return { success: "verification token sent" };
   }

   // we use the signIn function from next-auth to sign in the user with the credentials provider and redirect the user to the DEFAULT_LOGIN_REDIRECT

   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "invalid credentials" };

            default:
               return { error: "An error occurred " };
         }
      }

      // we return the error, this is compulsory otherwise the function will not throw an error.
      throw error;
   }
};
