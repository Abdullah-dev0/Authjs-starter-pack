"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schema";
import { AuthError } from "next-auth";

import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
   const validatedvalues = loginSchema.safeParse(values);

   if (!validatedvalues.success) {
      return { error: "invalid fields" };
   }

   const { email, password } = validatedvalues.data;

   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT,
      });

      return { success: "logged in" };
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "invalid credentials" };

            default:
               return { error: "An error accoured" };
         }
      }

      throw error;
   }
};
