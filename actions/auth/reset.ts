"use server";

import { getUserByEmail } from "@/data/auth/user";
import { sentResetPasswordEmail } from "@/lib/email";
import { resetPasswordSchema } from "@/schema";
import { z } from "zod";
import { generateResetPasswordVerificationToken } from "./tokens";

export const reset = async (data: z.infer<typeof resetPasswordSchema>) => {
   const validEmail = resetPasswordSchema.safeParse(data);

   if (!validEmail.success) {
      return { error: "Invalid email" };
   }

   const { email } = validEmail.data;

   try {
      const user = await getUserByEmail(email);
      if (!user) {
         return { error: "User not found" };
      }

      const passwordtoken = await generateResetPasswordVerificationToken(email);

      console.log(passwordtoken);

      await sentResetPasswordEmail(email, passwordtoken.token);

      return { success: "Reset password email sent !" };
   } catch (error) {
      console.log(error);
   }
};
