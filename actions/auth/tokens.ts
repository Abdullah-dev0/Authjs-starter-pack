import { getResetTokenByEmail } from "@/data/auth/resettoken";
import { getVerificationTokenByEmail } from "@/data/auth/tokens";
import prisma from "@/lib/prismaClient";
import { v4 as uuidv4 } from "uuid";

export const generateResetPasswordVerificationToken = async (email: string) => {
   const token = uuidv4();
   const expires = new Date(new Date().getTime() + 3600 * 1000); // This token will expire in 1 hour
   try {
      const extistingToken = await getResetTokenByEmail(email);

      if (extistingToken) {
         await prisma.passwordResetToken.delete({
            where: {
               id: extistingToken.id,
            },
         });
      }

      const verificationToken = await prisma.passwordResetToken.create({
         data: {
            email,
            token,
            expires,
         },
      });

      return verificationToken;
   } catch (error) {
      console.log(error);
   }
};

export const generateVerificationToken = async (email: string) => {
   const token = uuidv4();
   const expires = new Date(new Date().getTime() + 3600 * 1000); // This token will expire in 1 hour
   try {
      const extistingToken = await getVerificationTokenByEmail(email);

      if (extistingToken) {
         await prisma.verificationToken.delete({
            where: {
               id: extistingToken.id,
            },
         });
      }

      const verificationToken = await prisma.verificationToken.create({
         data: {
            email,
            token,
            expires,
         },
      });

      return verificationToken;
   } catch (error) {
      console.log(error);
   }
};
