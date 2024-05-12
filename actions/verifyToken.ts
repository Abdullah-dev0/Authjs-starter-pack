"use server";

import { getVerificationTokenByToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/prismaClient";

export const verifyToken = async (token: string) => {
   try {
      const existingToken = await getVerificationTokenByToken(token);

      if (!existingToken) {
         return { error: "Token not found" };
      }

      const tokenExpire = new Date(existingToken.expires) < new Date();

      if (tokenExpire) {
         return { error: "Token is expired" };
      }

      const user = await getUserByEmail(existingToken.email);

      if (!user) {
         return { error: "email not found" };
      }
      
      await prisma.user.update({
         where: {
            email: existingToken.email,
         },
         data: {
            emailVerified: new Date(),
            email: existingToken.email,
         },
      });

      await prisma.verificationToken.delete({
         where: {
            id: existingToken.id,
         },
      });

      return { success: "email verified" };
   } catch (error) {
      console.log(error);
   }
};
